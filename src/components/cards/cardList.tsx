import React, { useMemo, useState } from 'react'
import CardComponent from '@/components/cards/card'
import type Card from '@/entities/Card'
import type { RecordFieldType } from '@/utils/types/RecordFieldType'
import { FlatGrid } from 'react-native-super-grid'
import { StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { observer } from 'mobx-react'
import { useInjection } from 'inversify-react'
import type { MainStore } from '@/services/store/MainStore'
import { Services } from '@/ioc/services'
import { Text } from 'react-native-paper'
import { Trans, useTranslation } from 'react-i18next'

export type CardListProps = {
  data: Card[],
  onPress?: (cardId: RecordFieldType<Card, 'id'>) => void,
  numColumns?: number,
}

const NUM_COLUMNS_DEFAULT = 2

const CardList: React.FC<CardListProps> = observer(
  ({
    data,
    onPress,
    numColumns = NUM_COLUMNS_DEFAULT,
  }) => {
    const mainStore = useInjection<MainStore>(Services.MainStore)
    const { t } = useTranslation()

    const isEmpty = useMemo(() => data.length < 1, [data.length])
    const [emptyIconSize, setEmptyIconSize] = useState(48)

    if (isEmpty) {
      return (
        <View
          style={styles.emptyWrapper}
          onLayout={({ nativeEvent }) => setEmptyIconSize(nativeEvent.layout.width / 3)}
        >
          <Icon name="credit-card-off" color={mainStore.theme.colors.backdrop} size={emptyIconSize} />
          <Text variant="headlineSmall" style={[styles.textCenter, styles.paddingBottom]}>
            {t('HomeScreen.cardList.empty.title')}
          </Text>
          <Text variant="labelLarge" style={styles.textCenter}>
            <Trans t={t} i18nKey="HomeScreen.cardList.empty.subtitle">
              Press the <Icon name="plus-box" color={mainStore.theme.colors.primary} /> button at the bottom of the screen to add one
            </Trans>
          </Text>
        </View>
      )
    }


    return (
      <FlatGrid
        maxItemsPerRow={numColumns}
        itemDimension={50}
        adjustGridToStyles
        key={`card-list-${numColumns}-cols`}
        data={data}
        keyExtractor={item => item.id}
        renderItem={({ item }) => {
          return (
            <CardComponent data={item} onPress={() => onPress ? onPress(item.id) : {}} />
          )
        }}
        spacing={16}
      />
    )
  }
)

const styles = StyleSheet.create({
  emptyWrapper: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  textCenter: {
    textAlign: 'center',
  },
  paddingBottom: {
    paddingBottom: 8,
  },
})

export default CardList
