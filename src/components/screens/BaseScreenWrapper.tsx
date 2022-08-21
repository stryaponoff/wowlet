import type { PropsWithChildren } from 'react'
import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import type { MainStore } from '@/services/store/MainStore'
import { useInjection } from 'inversify-react'
import { Services } from '@/ioc/services'
import { observer } from 'mobx-react'

const BaseScreenWrapper: React.FC<PropsWithChildren> = observer(
  ({ children }) => {
    const { statusBarStyle, statusBarColor } = useInjection<MainStore>(Services.MainStore)

    return (
      <View style={styles.wrapper}>
        <StatusBar
          backgroundColor={statusBarColor}
          barStyle={statusBarStyle}
          animated={true}
          translucent={false}
        />

        <View style={styles.contentWrapper}>
          {children}
        </View>
      </View>
    )
  }
)
const styles = StyleSheet.create({
  wrapper: {
    flexGrow: 1,
  },
  contentWrapper: {
    flex: 1,
  },
})

export default BaseScreenWrapper
