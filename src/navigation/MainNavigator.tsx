import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen, HomeScreenName } from '@/screens/HomeScreen'
import { Appbar } from 'react-native-paper'
import { ScanResultScreen, ScanResultScreenName } from '@/screens/ScanResultScreen'
import { ScanScreen, ScanScreenName } from '@/screens/ScanScreen'
import type { Barcode } from '@/services/barcode/types'
import { useTranslation } from 'react-i18next'
import { BarcodeScreen, BarcodeScreenName } from '@/screens/BarcodeScreen'
import { HomeScreenThreeDotButton } from '@/components/screens/HomeScreen/HomeScreenThreeDotButton'
import { HomeScreenSortButton } from '@/components/screens/HomeScreen/HomeScreenSortButton'
import type Card from '@/entities/Card'
import type { RecordFieldType } from '@/utils/types/RecordFieldType'
import { SettingsScreen, SettingsScreenName } from '@/screens/SettingsScreen'
import type { StackNavigationProp } from '@react-navigation/stack/src/types'
import type { RouteProp } from '@react-navigation/core'

export type MainNavigatorParamList = {
  [HomeScreenName]: undefined
  [ScanScreenName]: undefined
  [ScanResultScreenName]: {
    barcode: Barcode
  },
  [BarcodeScreenName]: {
    cardId: RecordFieldType<Card, 'id'>
  },
  [SettingsScreenName]: undefined,
}

const Stack = createStackNavigator<MainNavigatorParamList>()

const MainNavigator: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Stack.Navigator
      initialRouteName={HomeScreenName}
      screenOptions={{
        header: ({ navigation, options }) => (
          <Appbar.Header mode="center-aligned">
            {navigation.canGoBack() && <Appbar.BackAction onPress={() => navigation.goBack()} />}
            <Appbar.Content title={options.title} />
            {options.headerRight && (
              options.headerRight({})
            )}
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen
        name={HomeScreenName}
        component={HomeScreen}
        options={{
          title: t('HomeScreen.title'),
          header: ({ navigation, route, options }) => (
            <Appbar.Header mode="large">
              <Appbar.Content title={options.title} />

              <HomeScreenSortButton />
              <HomeScreenThreeDotButton
                navigation={navigation as StackNavigationProp<MainNavigatorParamList, 'HomeScreen'>}
                route={route as RouteProp<MainNavigatorParamList, 'HomeScreen'>}
              />
            </Appbar.Header>
          ),
        }}
      />

      <Stack.Screen
        name={BarcodeScreenName}
        component={BarcodeScreen}
      />

      <Stack.Screen
        name={ScanScreenName}
        component={ScanScreen}
        options={{
          title: t('ScanScreen.title'),
        }}
      />

      <Stack.Screen
        name={ScanResultScreenName}
        component={ScanResultScreen}
        options={{
          title: t('ScanResultScreen.title'),
        }}
      />

      <Stack.Screen
        name={SettingsScreenName}
        component={SettingsScreen}
        options={{ title: t('SettingsScreen.title') }}
      />
    </Stack.Navigator>
  )
}

export default MainNavigator
