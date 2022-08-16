import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { FlatList } from 'react-native'
import CardComponent from '@/components/cards/card'
import CardWrapper from '@/components/cards/cardWrapper'
import type Card from '@/entities/Card'
import type { RecordFieldType } from '@/utils/types/RecordFieldType'

export type CardListProps = {
  data: Card[],
  style: StyleProp<ViewStyle>,
  onPress?: (cardId: RecordFieldType<Card, 'id'>) => void,
  numColumns?: number,
}

const NUM_COLUMNS_DEFAULT = 2

const CardList: React.FC<CardListProps> = ({
  data,
  style,
  onPress,
  numColumns = NUM_COLUMNS_DEFAULT,
}) => {
  return (
    <FlatList
      key={`list-${numColumns}-columns`}
      style={style}
      data={data}
      keyExtractor={item => item.name}
      renderItem={({ item, index }) => {
        return (
          <CardWrapper index={index} numColumns={numColumns} totalItems={data.length}>
            <CardComponent data={item} onPress={() => onPress ? onPress(item.id) : {}} />
          </CardWrapper>
        )
      }}
      numColumns={numColumns}
    />
  )
}

export default CardList
