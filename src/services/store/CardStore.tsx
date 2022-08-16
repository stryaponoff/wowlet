import { DateTime } from 'luxon'
import { injectable } from 'inversify'
import { action, makeAutoObservable } from 'mobx'
import type { BaseRepositoryInterface } from '@/services/store/BaseRepositoryInterface'
import EntityAlreadyExistsError from '@/errors/EntityAlreadyExistsError'
import EntityDoesNotExistError from '@/errors/EntityDoesNotExistError'
import deepmerge from 'deepmerge'
import type Card from '@/entities/Card'
import type { SortBy, SortDirection } from '@/utils/types/sort'
import AbsurdError from '@/errors/absurdError'

@injectable()
export class CardStore implements BaseRepositoryInterface<Card> {
  public entities: Record<string, Card> = {
    1: {
      id: '1',
      barcode: {
        code: 'test-1',
        format: 'QR',
      },
      name: 'Магнит',
      colorPrimary: '#d4301f',
      colorSecondary: '#fff',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    },
    2: {
      id: '2',
      barcode: {
        code: 'test-2',
        format: 'QR',
      },
      name: 'Триал спорт Триал спорт Триал спорт Триал спорт',
      colorPrimary: '#f1d448',
      colorSecondary: '#243076',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    },
    3: {
      id: '3',
      barcode: {
        code: '4606224105550',
        format: 'EAN13',
      },
      name: 'Пятёрочка',
      colorPrimary: '#499950',
      colorSecondary: '#fff',
      createdAt: DateTime.now(),
      updatedAt: DateTime.now(),
    },
  }

  public sortDirection: SortDirection = 'desc'
  public sortBy: SortBy = 'name'

  public insert = action((id: string, entity: Card): void => {
    if (id in this.entities) {
      throw new EntityAlreadyExistsError(id)
    }

    this.entities[id] = entity
  })

  public replace = action((id: string, entity: Card): void => {
    if (!(id in this.entities)) {
      throw new EntityDoesNotExistError(id)
    }

    this.entities[id] = entity
  })

  public update = action((id: string, data: Partial<Card>): void => {
    if (!(id in this.entities)) {
      throw new EntityDoesNotExistError(id)
    }

    this.entities[id] = deepmerge(this.entities[id], data)
  })

  public delete = action((id: string): void => {
    if (!(id in this.entities)) {
      throw new EntityDoesNotExistError(id)
    }

    delete this.entities[id]
  })

  public getAll = ((): Card[] => {
    return Object.values(this.entities).sort(this.getSorter())
  })

  public get = action((id: string): Card => {
    const entity = this.getAll().find(({ id: _id }) => _id === id)

    if (!entity) {
      throw new EntityDoesNotExistError(id)
    }

    return entity
  })

  public setSortDirection = action((direction: SortDirection) => {
    this.sortDirection = direction
  })

  public setSortBy = action((sortBy: SortBy) => {
    this.sortBy = sortBy
  })

  private getSorter(): (a: Card, b: Card) => number {
    const nameSorter = (a: Card, b: Card) => {
      const ascResult = a.name.localeCompare(b.name)
      if (ascResult === 0) {
        return ascResult
      }

      if (this.sortDirection === 'asc') {
        return ascResult
      } else {
        return -ascResult
      }
    }

    const createdAtSorter = (a: Card, b: Card) => {
      if  (this.sortDirection === 'asc') {
        return a < b ? 1 : -1
      } else {
        return a > b ? 1 : -1
      }
    }

    if (this.sortBy === 'name') {
      return nameSorter
    } else if (this.sortBy === 'createdAt') {
      return createdAtSorter
    } else {
      throw new AbsurdError(this.sortBy)
    }
  }

  constructor() {
    makeAutoObservable(this)
  }
}
