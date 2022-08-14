import React, { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack'
import type { MainNavigatorParamList } from '@/navigation/MainNavigator'
import BarcodeView from '@kichiyaki/react-native-barcode-generator'
import QRCode from 'react-native-qrcode-svg'
import BaseScreenWrapper from '@/components/screens/BaseScreenWrapper'
import BaseContentWrapper from '@/components/screens/BaseContentWrapper'
import DeviceBrightness from '@adrianso/react-native-device-brightness'

export const BarcodeScreenName = 'BarcodeScreen' as const
type BarcodeScreenProps = StackScreenProps<MainNavigatorParamList, typeof BarcodeScreenName>

export const BarcodeScreen: React.FC<BarcodeScreenProps> = ({ route }) => {
  useLayoutEffect(() => {
    DeviceBrightness.setBrightnessLevel(1)

    return () => {
      DeviceBrightness.setBrightnessLevel(-1)
    }
  }, [])

  return (
    <BaseScreenWrapper>
      <BaseContentWrapper>
        <View style={styles.barcodeWrapper}>
          {route.params.barcode.format === 'QR'
            ? <QRCode value={route.params.barcode.code}/>
            : <BarcodeView value={route.params.barcode.code} format={route.params.barcode.format}/>}
        </View>
      </BaseContentWrapper>
    </BaseScreenWrapper>
  )
}

const styles = StyleSheet.create({
  barcodeWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
