import React, { useLayoutEffect } from 'react'
import { createNavigationContainerRef } from '@react-navigation/core'
import type { MainNavigatorParamList } from '@/navigation/MainNavigator'
import MainNavigator from '@/navigation/MainNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider as PaperProvider } from 'react-native-paper'
import { useLanguageService } from '@/services/language/hooks'
import { observer } from 'mobx-react'
import type { MainStore } from '@/services/store/MainStore'
import { useInjection } from 'inversify-react'
import { Services } from '@/ioc/services'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { reaction } from 'mobx'
import type SettingsServiceInterface from '@/services/settings/SettingsServiceInterface'

export const navigationRef = createNavigationContainerRef<MainNavigatorParamList>()

const Content: React.FC<{ store: MainStore }> = observer(({ store }) => (
  <PaperProvider theme={store.theme}>
    <SafeAreaProvider>
      <NavigationContainer ref={navigationRef} theme={store.theme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <MainNavigator />
        </GestureHandlerRootView>
      </NavigationContainer>
    </SafeAreaProvider>
  </PaperProvider>
))

export default () => {
  const mainStore = useInjection<MainStore>(Services.MainStore)
  const settingsService = useInjection<SettingsServiceInterface>(Services.SettingsService)

  useLayoutEffect(() => {
    reaction(
      () => mainStore.preferredThemeType,
      value => {
        settingsService.setPreferredTheme(value)
      }
    )
  }, [])

  const { isInit: isLanguageServerInit } = useLanguageService()
  if (!isLanguageServerInit) {
    return null
  }

  return (
    <Content store={mainStore} />
  )
}
