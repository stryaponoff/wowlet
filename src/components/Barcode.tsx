import React, { useMemo, useState } from 'react'
import type { BarcodeFormat } from '@/services/barcode/types'
import BarcodeView from '@kichiyaki/react-native-barcode-generator'
import QRCode from 'react-native-qrcode-svg'
import type { LayoutRectangle, StyleProp, ViewStyle } from 'react-native'
import { StyleSheet, View } from 'react-native'

type BarcodeProps = {
  format: BarcodeFormat
  code: string
  style?: StyleProp<ViewStyle>
}

export const Barcode: React.FC<BarcodeProps> = ({ format, code, style }) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)
  const qrSize = useMemo(() => Math.min(width, height), [width, height])

  const setLayoutDimensions = ({ width: w, height: h }: LayoutRectangle) => {
    setWidth(w)
    setHeight(h)
  }

  return (
    <View style={style}>
      <View style={styles.flex1} onLayout={({ nativeEvent }) => setLayoutDimensions(nativeEvent.layout)}>
        {
          format === 'QR'
            ? <QRCode value={code} size={qrSize} />
            : <BarcodeView value={code} format={format} maxWidth={width} height={height / 2} />
        }
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
