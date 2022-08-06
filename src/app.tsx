import React from 'react'
import { createNavigationContainerRef } from '@react-navigation/core'
import type { MainNavigatorParamList } from '@/navigation/MainNavigator'
import { MainNavigator } from '@/navigation/MainNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider as PaperProvider } from 'react-native-paper'
import { useTheme } from '@/providers/themeProvider/useTheme'
import { useLanguageService } from '@/services/language/hooks'

export const navigationRef = createNavigationContainerRef<MainNavigatorParamList>()

export default () => {
  const { currentTheme } = useTheme()

  const { isInit: isLanguageServerInit } = useLanguageService()
  if (!isLanguageServerInit) {
    return null
  }

  return (
    <PaperProvider theme={currentTheme}>
      <NavigationContainer ref={navigationRef} theme={currentTheme}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <MainNavigator />
        </GestureHandlerRootView>
      </NavigationContainer>
    </PaperProvider>
  )
}
