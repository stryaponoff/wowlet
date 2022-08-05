import React from 'react'
import { createNavigationContainerRef } from '@react-navigation/core'
import { MainNavigator, MainNavigatorParamList } from '@/navigation/MainNavigator'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Provider as PaperProvider } from 'react-native-paper'
import { useTheme } from '@/providers/themeProvider/useTheme'

export const navigationRef = createNavigationContainerRef<MainNavigatorParamList>()

export default () => {
  const { currentTheme } = useTheme()

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
