import type { MMKVInstance } from 'react-native-mmkv-storage'
import { MMKVLoader } from 'react-native-mmkv-storage'
import { injectable } from 'inversify'
import type Card from '@/entities/Card'
import type { Sorter } from '@/services/card/types'
import mmkvFlipper from 'rn-mmkv-storage-flipper'

enum CardRepositoryKeys {
  CARDS = 'cards',
  SORTER = 'sorter',
}

@injectable()
export default class CardRepository {
  private readonly key = 'CARDS'
  private readonly storage: MMKVInstance

  constructor() {
    this.storage = new MMKVLoader()
      .withServiceName(this.key)
      .initialize()

    if (__DEV__) {
      mmkvFlipper(this.storage)
    }
  }

  public getCards(): Card[] {
    return this.storage.getArray<Card>(CardRepositoryKeys.CARDS) ?? []
  }

  public setCards(cards: Card[]) {
    this.storage.setArray(CardRepositoryKeys.CARDS, cards)
  }

  public getSorter(): Sorter {
    const DEFAULT_VALUE: Sorter = { direction: 'desc', sortBy: 'createdAt' }
    return this.storage.getMap<Sorter>(CardRepositoryKeys.SORTER) ?? DEFAULT_VALUE
  }

  public setSorter(sorter: Sorter): void {
    this.storage.setMap(CardRepositoryKeys.SORTER, sorter)
  }
}
