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
import { Services } from '@/ioc/services'
import type { CardStore } from '@/services/store/CardStore'
import { useTranslation } from 'react-i18next'
import { Appbar } from 'react-native-paper'
import { ThreeDotMenu } from '@/components/ThreeDotMenu'
import { HomeScreenName } from '@/screens/HomeScreen'
import { useSnackbar } from '@/providers/SnackbarProvider/useSnackbar'

export const BarcodeScreenName = 'BarcodeScreen' as const
type BarcodeScreenProps = StackScreenProps<MainNavigatorParamList, typeof BarcodeScreenName>

export const BarcodeScreen: React.FC<BarcodeScreenProps> = observer(({ navigation, route }) => {
  const cardStore = useInjection<CardStore>(Services.CardStore)
  const card = cardStore.get(route.params.cardId)

  const { t } = useTranslation()
  const snackbar = useSnackbar()

  useLayoutEffect(() => {
    DeviceBrightness.setBrightnessLevel(1)

    return () => {
      DeviceBrightness.setBrightnessLevel(-1)
    }
  }, [])

  useLayoutEffect(() => {
    if (!navigation || !t) {
      return
    }

    navigation.setOptions({
      title: cardStore.get(route.params.cardId).name,
      header: ({ navigation: nav, options }) => (
        <Appbar.Header mode="center-aligned">
          {nav.canGoBack() && <Appbar.BackAction onPress={() => nav.goBack()} />}

          <Appbar.Content title={options.title} />

          <ThreeDotMenu
            items={[
              {
                key: 'delete',
                icon: 'delete',
                label: t('BarcodeScreen.header.threeDotMenu.deleteButton'),
                onPress: () => {
                  cardStore.delete(route.params.cardId)
                  nav.replace(HomeScreenName)
                  snackbar.notify(
                    t('common.card.deletedSuccessfully', { name: cardStore.get(route.params.cardId).name }),
                    {
                      label: t('common.action.undo'),
                      onPress: () => {
                        cardStore.restore(route.params.cardId)
                      },
                    }
                  )
                },
              },
            ]}
          />
        </Appbar.Header>
      ),
    })
  }, [cardStore, navigation, route.params.cardId, t])

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
