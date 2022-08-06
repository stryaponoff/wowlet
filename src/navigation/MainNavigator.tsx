import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { HomeScreen, HomeScreenName } from '@/screens/HomeScreen'
import { Appbar } from 'react-native-paper'
import { ScanResultScreen, ScanResultScreenName } from '@/screens/ScanResultScreen'
import { ScanScreen, ScanScreenName } from '@/screens/ScanScreen'
import type { Barcode } from '@/services/barcode/types'
import { useTranslation } from 'react-i18next'

export type MainNavigatorParamList = {
  [HomeScreenName]: undefined
  [ScanScreenName]: undefined
  [ScanResultScreenName]: {
    barcode: Barcode
  }
}

const Stack = createStackNavigator<MainNavigatorParamList>()

export const MainNavigator: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Stack.Navigator
      initialRouteName={HomeScreenName}
      screenOptions={{
        header: ({ navigation, route }) => (
          <Appbar.Header mode="center-aligned">
            {navigation.canGoBack() && <Appbar.BackAction onPress={() => navigation.goBack()} />}
            <Appbar.Content title={route.name} />
          </Appbar.Header>
        ),
      }}
    >
      <Stack.Screen name={HomeScreenName} component={HomeScreen} options={{ title: t('HomeScreen.title') }} />
      <Stack.Screen name={ScanScreenName} component={ScanScreen} />
      <Stack.Screen name={ScanResultScreenName} component={ScanResultScreen} />
    </Stack.Navigator>
  )
}
