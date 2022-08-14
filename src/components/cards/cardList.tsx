import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'
import { FlatList } from 'react-native'
import Card from '@/components/cards/card'
import type { CardData } from '@/services/domain/card/types'
import CardWrapper from '@/components/cards/cardWrapper'

export const CardDataMock: CardData[] = [
  {
    name: 'Магнит',
    colorPrimary: '#d4301f',
    colorSecondary: '#fff',
  },
  {
    name: 'Триал спорт Триал спорт Триал спорт Триал спорт',
    colorPrimary: '#f1d448',
    colorSecondary: '#243076',
  },
  {
    name: 'Пятёрочка',
    colorPrimary: '#499950',
    colorSecondary: '#fff',
  },
  {
    name: 'Пятёрочка',
    colorPrimary: '#499950',
    colorSecondary: '#fff',
  },
  {
    name: 'Пятёрочка',
    colorPrimary: '#499950',
    colorSecondary: '#fff',
  },
  {
    name: 'Пятёрочка',
    colorPrimary: '#499950',
    colorSecondary: '#fff',
  },
]

export type CardListProps = {
  style: StyleProp<ViewStyle>,
  onPress?: () => void, // TODO: Add card to payload
  numColumns?: number,
}

const NUM_COLUMNS_DEFAULT = 2

const CardList: React.FC<CardListProps> = ({
  style,
  onPress,
  numColumns = NUM_COLUMNS_DEFAULT,
}) => {
  return (
    <FlatList
      key={`list-${numColumns}-columns`}
      style={style}
      data={CardDataMock}
      keyExtractor={item => item.name}
      renderItem={({ item, index }) =>
        (
          <CardWrapper index={index} numColumns={numColumns} totalItems={CardDataMock.length}>
            <Card data={item} onPress={onPress} />
          </CardWrapper>
        )}
      numColumns={numColumns}
    />
  )
}

export default CardList
