import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen, HomeScreenName } from '@/screens/HomeScreen'
import { Appbar, Menu } from 'react-native-paper'
import { ScanResultScreen, ScanResultScreenName } from '@/screens/ScanResultScreen'
import { ScanScreen, ScanScreenName } from '@/screens/ScanScreen'
import type { Barcode } from '@/services/barcode/types'
import { useTranslation } from 'react-i18next'
import { BarcodeScreenName } from '@/screens/BarcodeScreen'
import { BarcodeScreen } from '@/screens/BarcodeScreen'
import { HomeScreenThreeDotButton } from '@/components/screens/HomeScreen/HomeScreenThreeDotButton'
import { HomeScreenSortButton } from '@/components/screens/HomeScreen/HomeScreenSortButton'

export type MainNavigatorParamList = {
  [HomeScreenName]: undefined
  [ScanScreenName]: undefined
  [ScanResultScreenName]: {
    barcode: Barcode
  },
  [BarcodeScreenName]: {
    barcode: Barcode
  }
}

const Stack = createStackNavigator<MainNavigatorParamList>()

const MainNavigator: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Stack.Navigator
      initialRouteName={HomeScreenName}
      screenOptions={{
        header: ({ navigation, options }) => (
          <Appbar.Header>
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
          headerRight: () => (
            <>
              <HomeScreenSortButton />
              <HomeScreenThreeDotButton />
            </>
          ),
        }}
      />

      <Stack.Screen name={BarcodeScreenName} component={BarcodeScreen} options={{ title: '%card_name%' }} />
      <Stack.Screen name={ScanScreenName} component={ScanScreen} />
      <Stack.Screen name={ScanResultScreenName} component={ScanResultScreen} />
    </Stack.Navigator>
  )
}

export default MainNavigator
