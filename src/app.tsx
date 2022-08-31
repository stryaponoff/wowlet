import React from 'react'
import { useNavigationContainerRef } from '@react-navigation/core'
import type { MainNavigatorParamList } from '@/navigation/MainNavigator'
import MainNavigator from '@/navigation/MainNavigator'
import { useFlipper } from '@react-navigation/devtools'
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
import { StyleSheet } from 'react-native'
import { SnackbarProvider } from '@/providers/SnackbarProvider/SnackbarProvider'

const App: React.FC = observer(() => {
  const navigationRef = useNavigationContainerRef<MainNavigatorParamList>()
  if (__DEV__ && !process.env.JEST_WORKER_ID) {
    useFlipper(navigationRef)
  }

  const mainStore = useInjection<MainStore>(Services.MainStore)

  const { isInit: isLanguageServerInit } = useLanguageService()
  if (!isLanguageServerInit) {
    return null
  }

  return (
    <PaperProvider theme={mainStore.theme}>
      <SafeAreaProvider>
        <NavigationContainer ref={navigationRef} theme={mainStore.theme}>
          <GestureHandlerRootView style={styles.wrapper}>
            <MainStoreReactionProvider>
              <CardStoreReactionProvider>
                <SnackbarProvider>
                  <MainNavigator />
                </SnackbarProvider>
              </CardStoreReactionProvider>
            </MainStoreReactionProvider>
          </GestureHandlerRootView>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  )
})

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
})

export default App
