import type { MMKVInstance } from 'react-native-mmkv-storage'
import { MMKVLoader } from 'react-native-mmkv-storage'
import { injectable } from 'inversify'
import type Card from '@/entities/Card'
import { DateTime } from 'luxon'
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
    return this.storage.getArray<Card>(CardRepositoryKeys.CARDS) ?? [
      {
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
      // {
      //   id: '2',
      //   barcode: {
      //     code: 'test-2',
      //     format: 'QR',
      //   },
      //   name: 'Триал спорт',
      //   colorPrimary: '#f1d448',
      //   colorSecondary: '#243076',
      //   createdAt: DateTime.now(),
      //   updatedAt: DateTime.now(),
      // },
      {
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
    ]
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
