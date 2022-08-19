import React from 'react'
import { StyleSheet } from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack'
import type { MainNavigatorParamList } from '@/navigation/MainNavigator'
import { FAB } from 'react-native-paper'
import { ScanScreenName } from '@/screens/ScanScreen'
import BaseScreenWrapper from '@/components/screens/BaseScreenWrapper'
import BaseContentWrapper from '@/components/screens/BaseContentWrapper'
import { observer } from 'mobx-react'
import CardList from '@/components/cards/cardList'
import { BarcodeScreenName } from '@/screens/BarcodeScreen'
import type { BaseRepositoryInterface } from '@/services/store/BaseRepositoryInterface'
import type Card from '@/entities/Card'
import { useInjection } from 'inversify-react'
import { Services } from '@/ioc/services'
import type { RecordFieldType } from '@/utils/types/RecordFieldType'
import type { CardStore } from '@/services/store/CardStore'

export const HomeScreenName = 'HomeScreen' as const
type HomeScreenProps = StackScreenProps<MainNavigatorParamList, typeof HomeScreenName>

export const HomeScreen: React.FC<HomeScreenProps> = observer(({ navigation }) => {
  const cardStore = useInjection<CardStore>(Services.CardStore)

  const navigateToScanScreen = () => {
    navigation.navigate(ScanScreenName)
  }

  const navigateToBarcodeScreen = (cardId: RecordFieldType<Card, 'id'>) => {
    navigation.navigate(BarcodeScreenName, { cardId })
  }

  return (
    <BaseScreenWrapper>
      <BaseContentWrapper noHorizontalPadding>
        <CardList
          data={cardStore.getAll()}
          onPress={cardId => navigateToBarcodeScreen(cardId)}
          numColumns={2}
        />
      </BaseContentWrapper>

      <FAB icon="plus" style={styles.fab} onPress={navigateToScanScreen}/>
    </BaseScreenWrapper>
  )
})

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
