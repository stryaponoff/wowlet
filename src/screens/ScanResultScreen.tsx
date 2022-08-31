import React from 'react'
import type { StackScreenProps } from '@react-navigation/stack'
import type { MainNavigatorParamList } from '@/navigation/MainNavigator'
import BaseScreenWrapper from '@/components/screens/BaseScreenWrapper'
import BaseContentWrapper from '@/components/screens/BaseContentWrapper'
import { CardAddForm } from '@/components/form/CardAddForm'
import { HomeScreenName } from '@/screens/HomeScreen'

export const ScanResultScreenName = 'ScanResultScreen' as const
type ScanResultScreenProps = StackScreenProps<MainNavigatorParamList, typeof ScanResultScreenName>

export const ScanResultScreen: React.FC<ScanResultScreenProps> = ({ navigation, route }) => {
  const navigateToHomeScreen = () => {
    navigation.replace(HomeScreenName)
  }

  return (
    <BaseScreenWrapper>
      <BaseContentWrapper>
        <CardAddForm
          barcode={route.params.barcode}
          onAfterSubmit={navigateToHomeScreen}
        />
      </BaseContentWrapper>
    </BaseScreenWrapper>
  )
}
