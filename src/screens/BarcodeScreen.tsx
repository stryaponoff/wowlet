import React, { useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack'
import type { MainNavigatorParamList } from '@/navigation/MainNavigator'
import BarcodeView from '@kichiyaki/react-native-barcode-generator'
import QRCode from 'react-native-qrcode-svg'
import BaseScreenWrapper from '@/components/screens/BaseScreenWrapper'
import BaseContentWrapper from '@/components/screens/BaseContentWrapper'
import DeviceBrightness from '@adrianso/react-native-device-brightness'
import { observer } from 'mobx-react'
import { useInjection } from 'inversify-react'
import type { BaseRepositoryInterface } from '@/services/store/BaseRepositoryInterface'
import type Card from '@/entities/Card'
import { Services } from '@/ioc/services'

export const BarcodeScreenName = 'BarcodeScreen' as const
type BarcodeScreenProps = StackScreenProps<MainNavigatorParamList, typeof BarcodeScreenName>

export const BarcodeScreen: React.FC<BarcodeScreenProps> = observer(({ navigation, route }) => {
  const cardStore = useInjection<BaseRepositoryInterface<Card>>(Services.CardStore)
  const card = cardStore.get(route.params.cardId)

  useLayoutEffect(() => {
    DeviceBrightness.setBrightnessLevel(1)

    return () => {
      DeviceBrightness.setBrightnessLevel(-1)
    }
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({ title: cardStore.get(route.params.cardId).name })
  }, [cardStore, navigation, route.params.cardId])

  return (
    <BaseScreenWrapper>
      <BaseContentWrapper>
        <View style={styles.barcodeWrapper}>
          {card.barcode.format === 'QR'
            ? <QRCode value={card.barcode.code}/>
            : <BarcodeView value={card.barcode.code} format={card.barcode.format}/>}
        </View>
      </BaseContentWrapper>
    </BaseScreenWrapper>
  )
})

const styles = StyleSheet.create({
  barcodeWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
