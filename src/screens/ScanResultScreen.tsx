import React from 'react'
import { StyleSheet } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { MainNavigatorParamList } from '@/navigation/MainNavigator'
import { Text } from 'react-native-paper'
import BarcodeView from '@kichiyaki/react-native-barcode-generator'
import QRCode from 'react-native-qrcode-svg'
import BaseScreenWrapper from '@/components/screens/BaseScreenWrapper'
import BaseContentWrapper from '@/components/screens/BaseContentWrapper'

export const ScanResultScreenName = 'ScanResultScreen' as const
type ScanResultScreenProps = StackScreenProps<MainNavigatorParamList, typeof ScanResultScreenName>

export const ScanResultScreen: React.FC<ScanResultScreenProps> = ({ route }) => {
  return (
    <BaseScreenWrapper>
      <BaseContentWrapper>
          <Text variant="bodyLarge">{route.params.barcode.code}</Text>
          <Text variant="bodyLarge">{route.params.barcode.format}</Text>
          {route.params.barcode.format === 'QR'
            ? <QRCode value={route.params.barcode.code}/>
            : <BarcodeView value={route.params.barcode.code} format={route.params.barcode.format}/>}
      </BaseContentWrapper>
    </BaseScreenWrapper>
  )
}

const styles = StyleSheet.create({
})
