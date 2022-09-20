import { inject, injectable } from 'inversify'
import { Services } from '@/ioc/services'
import type CardRepository from '@/repositories/CardRepository'
import type CardServiceInterface from '@/services/card/CardServiceInterface'
import type { Card } from '@/models/Card'
import type { Sorter } from '@/services/card/types'

@injectable()
export default class CardService implements CardServiceInterface {
  constructor(
    @inject(Services.CardRepository) protected readonly repo: CardRepository,
  ) {

  }

  public getCards(): Card[] {
    return this.repo.getCards()
  }

  public setCards(cards: Card[]): void {
    return this.repo.setCards(cards)
  }

  public getSorter(): Sorter {
    return this.repo.getSorter()
  }

  public setSorter(sorter: Sorter): void {
    this.repo.setSorter(sorter)
  }
}
