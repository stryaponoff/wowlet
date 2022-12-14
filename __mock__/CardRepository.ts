/* eslint-disable @typescript-eslint/no-unused-vars */
import type Card from '@/models/Card'
import type { Sorter } from '@/services/card/types'
import { injectable } from 'inversify'

@injectable()
export default class CardRepository {
  private readonly key = 'CARDS'

  public getCards(): Card[] {
    return []
  }

  public setCards(cards: Card[]) {}

  public getSorter(): Sorter {
    return { direction: 'desc', sortBy: 'createdAt' }
  }

  public setSorter(sorter: Sorter): void {
  }
}
