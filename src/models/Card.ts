import type { Barcode } from '@/services/barcode/types'
import { DateTime } from 'luxon'
import { JsonObject, JsonProperty } from 'typescript-json-serializer'

@JsonObject()
export class Card {
  constructor(
    @JsonProperty() public readonly id: string,
    @JsonProperty() public name: string,
    @JsonProperty() public barcode: Barcode,
    @JsonProperty() public colorPrimary: string,
    @JsonProperty() public colorSecondary: string,

    @JsonProperty({
      beforeDeserialize: (value: string) => DateTime.fromISO(value),
      beforeSerialize: (value: DateTime) => value.toISO(),
    }) public createdAt: DateTime,

    @JsonProperty({
      beforeDeserialize: (value: string) => DateTime.fromISO(value),
      beforeSerialize: (value: DateTime) => value.toISO(),
    }) public updatedAt: DateTime,

    @JsonProperty({
      beforeDeserialize: (value: string | undefined) => value ? DateTime.fromISO(value) : undefined,
      beforeSerialize: (value: DateTime | undefined) => value ? value.toISO() : undefined,
      required: false,
    }) public lastUsedAt?: DateTime,

    @JsonProperty({
      beforeDeserialize: (value: string | undefined) => value ? DateTime.fromISO(value) : undefined,
      beforeSerialize: (value: DateTime | undefined) => value ? value.toISO() : undefined,
      required: false,
    }) public deletedAt?: DateTime
  ) {}
}
