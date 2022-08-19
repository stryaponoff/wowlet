import React from 'react'
import CardComponent from '@/components/cards/card'
import type Card from '@/entities/Card'
import type { RecordFieldType } from '@/utils/types/RecordFieldType'
import { FlatGrid } from 'react-native-super-grid'

export type CardListProps = {
  data: Card[],
  onPress?: (cardId: RecordFieldType<Card, 'id'>) => void,
  numColumns?: number,
}

const NUM_COLUMNS_DEFAULT = 2

const CardList: React.FC<CardListProps> = ({
  data,
  onPress,
  numColumns = NUM_COLUMNS_DEFAULT,
}) => {
  return (
    <FlatGrid
      data={data}
      keyExtractor={item => item.id}
      maxItemsPerRow={3}
      renderItem={({ item }) => {
        return (
          <CardComponent data={item} onPress={() => onPress ? onPress(item.id) : {}} />
        )
      }}
      spacing={16}
    />
  )
}

export default CardList
