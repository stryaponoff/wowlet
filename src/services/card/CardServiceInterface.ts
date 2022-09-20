import type Card from '@/models/Card'
import type { Sorter } from '@/services/card/types'

export default interface CardServiceInterface {
  getCards(): Card[]
  setCards(card: Card[]): void
  getSorter(): Sorter
  setSorter(sorter: Sorter): void
}
