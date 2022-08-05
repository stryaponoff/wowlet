import React, { PropsWithChildren } from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import { useTheme } from '@/providers/themeProvider/useTheme'

const BaseScreenWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const { statusBarStyle, statusBarColor } = useTheme()

  return (
    <View style={{ flexGrow: 1 }}>
      <StatusBar
        backgroundColor={statusBarColor}
        barStyle={statusBarStyle}
        animated={true}
        translucent={false}
      />

      <View style={styles.container}>
        {children}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default BaseScreenWrapper
