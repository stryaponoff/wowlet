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
import MainStoreReactionProvider from './components/reaction-providers/MainStoreReactionProvider'
import CardStoreReactionProvider from '@/components/reaction-providers/CardStoreReactionProvider'

export const navigationRef = createNavigationContainerRef<MainNavigatorParamList>()

const App: React.FC = observer(() => {
  const mainStore = useInjection<MainStore>(Services.MainStore)

  const { isInit: isLanguageServerInit } = useLanguageService()
  if (!isLanguageServerInit) {
    return null
  }

  return (
    <PaperProvider theme={mainStore.theme}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef} theme={mainStore.theme}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <MainStoreReactionProvider>
              <CardStoreReactionProvider>
                <MainNavigator />
              </CardStoreReactionProvider>
            </MainStoreReactionProvider>
          </GestureHandlerRootView>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  )
})

export default App
