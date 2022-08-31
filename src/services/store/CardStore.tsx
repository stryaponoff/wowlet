import { inject, injectable } from 'inversify'
import { action, get, makeAutoObservable, remove, set, values } from 'mobx'
import type { BaseRepositoryInterface } from '@/services/store/BaseRepositoryInterface'
import EntityAlreadyExistsError from '@/errors/EntityAlreadyExistsError'
import EntityDoesNotExistError from '@/errors/EntityDoesNotExistError'
import deepmerge from 'deepmerge'
import type Card from '@/entities/Card'
import AbsurdError from '@/errors/absurdError'
import { Services } from '@/ioc/services'
import type CardService from '@/services/card/CardService'
import type { SortBy, SortDirection, Sorter } from '@/services/card/types'

@injectable()
export class CardStore implements BaseRepositoryInterface<Card> {
  public entities: Record<string, Card> = {}

  public sorter: Sorter

  public insert = action((id: string, entity: Omit<Card, 'id'>): void => {
    if (id in this.entities) {
      throw new EntityAlreadyExistsError(id)
    }

    set(this.entities, id, entity)
  })

  public replace = action((id: string, entity: Omit<Card, 'id'>): void => {
    if (!(id in this.entities)) {
      throw new EntityDoesNotExistError(id)
    }

    set(this.entities, id, entity)
  })

  public update = action((id: string, data: Partial<Omit<Card, 'id'>>): void => {
    if (!(id in this.entities)) {
      throw new EntityDoesNotExistError(id)
    }

    set(this.entities, id, deepmerge(get(this.entities, id), data))
  })

  public delete = action((id: string): void => {
    if (!(id in this.entities)) {
      throw new EntityDoesNotExistError(id)
    }

    remove(this.entities, id)
  })

  public getAll() {
    return [...values(this.entities)].sort(this.getSorter())
  }

  public get all() {
    return values(this.entities) as unknown as Card[]
  }

  public get = action((id: string): Card => {
    const entity = this.getAll().find(({ id: _id }) => _id === id)

    if (!entity) {
      throw new EntityDoesNotExistError(id)
    }

    return entity
  })

  public setSortDirection = action((direction: SortDirection) => {
    this.sorter = {
      ...this.sorter,
      direction,
    }
  })

  public setSortBy = action((sortBy: SortBy) => {
    this.sorter = {
      ...this.sorter,
      sortBy,
    }
  })

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
        return a < b ? 1 : -1
      } else {
        return a > b ? 1 : -1
      }
    }

    if (this.sorter.sortBy === 'name') {
      return nameSorter
    } else if (this.sorter.sortBy === 'createdAt') {
      return createdAtSorter
    } else {
      throw new AbsurdError(this.sorter.sortBy)
    }
  }

  constructor(
    @inject(Services.CardService) protected readonly cardService: CardService
  ) {
    this.entities = Object.fromEntries(this.cardService.getCards().map(card => [card.id, card]))
    this.sorter = this.cardService.getSorter()

    makeAutoObservable(this)
  }
}
