import type { PropsWithChildren } from 'react'
import React from 'react'
import { StatusBar, StyleSheet, View } from 'react-native'
import type { MainStore } from '@/services/store/MainStore'
import { useInjection } from 'inversify-react'
import { Services } from '@/ioc/services'
import { observer } from 'mobx-react'

const BaseScreenWrapperWithStore: React.FC<PropsWithChildren<{ mainStore: MainStore }>> = observer(
  (
    {
      mainStore: {
        statusBarColor,
        statusBarStyle,
      },
      children,
    }
  ) => {
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
)
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const BaseScreenWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const mainStore = useInjection<MainStore>(Services.MainStore)
  return (
    <BaseScreenWrapperWithStore mainStore={mainStore}>
      {children}
    </BaseScreenWrapperWithStore>
  )
}

export default BaseScreenWrapper
