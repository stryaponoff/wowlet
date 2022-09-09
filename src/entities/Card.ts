import type { Barcode } from '@/services/barcode/types'
import type { DateTime } from 'luxon'

/**
 * @todo get rid of exclamation marks
 */
export default class Card {
  public id!: string
  public name!: string
  public barcode!: Barcode
  public colorPrimary!: string
  public colorSecondary!: string
  public createdAt!: DateTime
  public updatedAt!: DateTime
  public lastUsedAt?: DateTime
  public deletedAt?: DateTime
}
