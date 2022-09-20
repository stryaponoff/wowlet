import { inject, injectable } from 'inversify'
import { makeAutoObservable, set, values } from 'mobx'
import type { BaseRepositoryInterface } from '@/services/store/BaseRepositoryInterface'
import EntityAlreadyExistsError from '@/errors/EntityAlreadyExistsError'
import EntityDoesNotExistError from '@/errors/EntityDoesNotExistError'
import type { Card } from '@/models/Card'
import AbsurdError from '@/errors/absurdError'
import { Services } from '@/ioc/services'
import type CardService from '@/services/card/CardService'
import type { SortBy, SortDirection, Sorter } from '@/services/card/types'
import { DateTime } from 'luxon'
import { JsonSerializer } from 'typescript-json-serializer'

@injectable()
export class CardStore implements BaseRepositoryInterface<Card> {
  public entities: Record<string, Card> = {}

  public sorter: Sorter

  public insert(id: string, entity: Omit<Card, 'id'>): void {
    if (id in this.entities) {
      throw new EntityAlreadyExistsError(id)
    }

    set(this.entities, id, { ...entity, id })
  }

  public replace(id: string, entity: Omit<Card, 'id'>): void {
    if (!(id in this.entities)) {
      throw new EntityDoesNotExistError(id)
    }

    set(this.entities, id, entity)
  }

  public update(id: string, data: Partial<Omit<Card, 'id'>>): void {
    if (!(id in this.entities)) {
      throw new EntityDoesNotExistError(id)
    }

    set(
      this.entities,
      id,
      {
        ...this.entities[id],
        ...data,
        updatedAt: DateTime.now(),
      }
    )
  }

  public delete(id: string): void {
    if (!(id in this.entities)) {
      throw new EntityDoesNotExistError(id)
    }

    set(
      this.entities,
      id,
      {
        ...this.entities[id],
        deletedAt: DateTime.now(),
      }
    )
  }

  public restore(id: string): void {
    if (!(id in this.entities)) {
      throw new EntityDoesNotExistError(id)
    }

    set(
      this.entities,
      id,
      {
        ...this.entities[id],
        deletedAt: undefined,
      }
    )
  }

  public get allRaw() {
    return values(this.entities)
  }

  public get all() {
    return [...values(this.entities)]
      .filter(({ deletedAt }) => !deletedAt)
      .sort(this.getSorter())
  }

  public get(id: string): Card {
    const entity = this.allRaw.find(({ id: _id }) => _id === id)

    if (!entity) {
      throw new EntityDoesNotExistError(id)
    }

    return entity
  }

  public setSortDirection(direction: SortDirection) {
    this.sorter = {
      ...this.sorter,
      direction,
    }
  }

  public setSortBy(sortBy: SortBy) {
    this.sorter = {
      ...this.sorter,
      sortBy,
    }
  }

  private getSorter(): (a: Card, b: Card) => number {
    const nameSorter = (a: Card, b: Card) => {
      const ascResult = a.name.localeCompare(b.name)
      if (ascResult === 0) {
        return ascResult
      }

      if (this.sorter.direction === 'asc') {
        return ascResult
      } else {
        return -ascResult
      }
    }

    const createdAtSorter = (a: Card, b: Card) => {
      if  (this.sorter.direction === 'asc') {
        return a.createdAt < b.createdAt ? 1 : -1
      } else {
        return a.createdAt > b.createdAt ? 1 : -1
      }
    }

    const lastUsedAtSorter = (a: Card, b: Card) => {
      if  (this.sorter.direction === 'asc') {
        return (a.lastUsedAt ?? 0) < (b.lastUsedAt ?? 0) ? 1 : -1
      } else {
        return (a.lastUsedAt ?? 0) > (b.lastUsedAt ?? 0) ? 1 : -1
      }
    }

    if (this.sorter.sortBy === 'name') {
      return nameSorter
    } else if (this.sorter.sortBy === 'createdAt') {
      return createdAtSorter
    } else if (this.sorter.sortBy === 'lastUsedAt') {
      return lastUsedAtSorter
    } else {
      throw new AbsurdError(this.sorter.sortBy)
    }
  }

  constructor(
    @inject(Services.CardService) protected readonly cardService: CardService
  ) {
    this.entities = Object.fromEntries(this.cardService.getCards().map(card => [card.id, card]))

    const serializer = new JsonSerializer()
    // console.log('entities #1', serializer.serialize(Object.values(this.entities)))
    console.log('entities #2', this.entities)

    this.sorter = this.cardService.getSorter()

    makeAutoObservable(this)
  }
}
