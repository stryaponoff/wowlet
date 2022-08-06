import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack'
import type { MainNavigatorParamList } from '@/navigation/MainNavigator'
import { FAB, Text } from 'react-native-paper'
import { ScanScreenName } from '@/screens/ScanScreen'
import BaseScreenWrapper from '@/components/screens/BaseScreenWrapper'
import BaseContentWrapper from '@/components/screens/BaseContentWrapper'
import { useInjection } from 'inversify-react'
import type { MainStore } from '@/services/store/MainStore'
import { Services } from '@/ioc/services'
import { observer } from 'mobx-react'


export const HomeScreenName = 'HomeScreen' as const
type HomeScreenProps = StackScreenProps<MainNavigatorParamList, typeof HomeScreenName>

export const HomeScreen: React.FC<HomeScreenProps> = observer(({ navigation }) => {
  const mainStore = useInjection<MainStore>(Services.MainStore)
  const [{ counter }] = useState(() => mainStore)

  const navigateToScanScreen = async () => {
    navigation.navigate(ScanScreenName)
  }

  return (
    <BaseScreenWrapper>
      <BaseContentWrapper>
        <Text variant="bodyLarge">{ counter }</Text>
      </BaseContentWrapper>

      <FAB icon="plus" style={styles.fab} onPress={navigateToScanScreen}/>
    </BaseScreenWrapper>
  )
})

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 8,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
})
