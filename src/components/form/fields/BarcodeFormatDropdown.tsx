import React, { useMemo, useState } from 'react'
import type { DropDownPropsInterface } from 'react-native-paper-dropdown'
import DropDown from 'react-native-paper-dropdown'
import type { BarcodeFormat } from '@/services/barcode/types'
import { useTranslation } from 'react-i18next'
import { useInjection } from 'inversify-react'
import { Services } from '@/ioc/services'
import { observer } from 'mobx-react'
import type { MainStore } from '@/services/store/MainStore'
import type { StyleProp, ViewStyle } from 'react-native'
import { View } from 'react-native'

type BarcodeFormatDropdown = Omit<
  DropDownPropsInterface,
  | 'list'
  | 'visible'
  | 'onDismiss'
  | 'showDropDown'
  | 'setValue'
> & {
  onChange?: (value: BarcodeFormat) => void
  style?: StyleProp<ViewStyle>
  hasError?: boolean // TODO: Make it work
  errorText?: string // TODO: Make it work
}

const BarcodeFormatDropdown: React.FC<BarcodeFormatDropdown> = observer(
  (props) => {
    const mainStore = useInjection<MainStore>(Services.MainStore)
    const { t } = useTranslation()

    const [showDropdown, setShowDropdown] = useState(false)

    const list: Array<{ label: string; value: BarcodeFormat }> = useMemo(() => (
      [
        {
          value: 'ITF',
          label: t('barcodeFormat.ITF'),
        },
        {
          value: 'CODE39',
          label: t('barcodeFormat.CODE39'),
        },
        {
          value: 'CODE128',
          label: t('barcodeFormat.CODE128'),
        },
        {
          value: 'EAN13',
          label: t('barcodeFormat.EAN13'),
        },
        {
          value: 'EAN8',
          label: t('barcodeFormat.EAN8'),
        },
        {
          value: 'UPC',
          label: t('barcodeFormat.UPC'),
        },
        {
          value: 'UPCE',
          label: t('barcodeFormat.UPCE'),
        },
        {
          value: 'codabar',
          label: t('barcodeFormat.codabar'),
        },
        {
          value: 'QR',
          label: t('barcodeFormat.QR'),
        },
      ]
    ), [t, mainStore.language])

    return (
      <View style={props.style}>
        <DropDown
          {...props}
          visible={showDropdown}
          showDropDown={() => setShowDropdown(true)}
          onDismiss={() => setShowDropdown(false)}
          mode="outlined"
          list={list}
          setValue={props.onChange ?? (() => {})}
        />
      </View>
    )
  }
)
export default BarcodeFormatDropdown
