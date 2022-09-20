import React, { useLayoutEffect } from 'react'
import { StyleSheet } from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack'
import type { MainNavigatorParamList } from '@/navigation/MainNavigator'
import { Appbar, FAB } from 'react-native-paper'
import { ScanScreenName } from '@/screens/ScanScreen'
import BaseScreenWrapper from '@/components/screens/BaseScreenWrapper'
import BaseContentWrapper from '@/components/screens/BaseContentWrapper'
import { observer } from 'mobx-react'
import CardList from '@/components/cards/cardList'
import { BarcodeScreenName } from '@/screens/BarcodeScreen'
import type Card from '@/models/Card'
import { useInjection } from 'inversify-react'
import { Services } from '@/ioc/services'
import type { RecordFieldType } from '@/utils/types/RecordFieldType'
import type { CardStore } from '@/services/store/CardStore'
import { HomeScreenSortButton } from '@/components/screens/HomeScreen/HomeScreenSortButton'
import { ThreeDotMenu } from '@/components/ThreeDotMenu'
import { SettingsScreenName } from '@/screens/SettingsScreen'
import { useTranslation } from 'react-i18next'
import { DateTime } from 'luxon'

export const HomeScreenName = 'HomeScreen' as const
type HomeScreenProps = StackScreenProps<MainNavigatorParamList, typeof HomeScreenName>

export const HomeScreen: React.FC<HomeScreenProps> = observer(({ navigation }) => {
  const cardStore = useInjection<CardStore>(Services.CardStore)
  const { t } = useTranslation()

  const navigateToScanScreen = () => {
    navigation.navigate(ScanScreenName)
  }

  const navigateToBarcodeScreen = (cardId: RecordFieldType<Card, 'id'>) => {
    cardStore.update(cardId, { lastUsedAt: DateTime.now() })
    navigation.navigate(BarcodeScreenName, { cardId })
  }

  useLayoutEffect(() => {
    if (!navigation || !t) {
      return
    }

    navigation.setOptions({
      header: ({ navigation: nav, options }) => (
        <Appbar.Header mode="large">
          <Appbar.Content title={options.title} />

          <HomeScreenSortButton />
          <ThreeDotMenu
            items={[
              {
                key: 'settings',
                icon: 'cog',
                label: t('HomeScreen.header.threeDotMenu.settingsButton'),
                onPress: () => {
                  nav.navigate(SettingsScreenName)
                },
              },
            ]}
          />
        </Appbar.Header>
      ),
    })
  }, [t, navigation])

  return (
    <BaseScreenWrapper>
      <BaseContentWrapper noScroll noHorizontalPadding>
        <CardList
          data={cardStore.all}
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
