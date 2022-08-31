import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import type { StackScreenProps } from '@react-navigation/stack'
import type { MainNavigatorParamList } from '@/navigation/MainNavigator'
import { Camera, useCameraDevices, useFrameProcessor } from 'react-native-vision-camera'
import type { Barcode as VisionCameraBarcode } from 'vision-camera-code-scanner'
import { BarcodeFormat, scanBarcodes } from 'vision-camera-code-scanner'
import { ScanResultScreenName } from './ScanResultScreen'
import { useInjection } from 'inversify-react'
import type CameraServiceInterface from '@/services/camera/CameraServiceInterface'
import { Services } from '@/ioc/services'
import { Text } from 'react-native-paper'
import { runOnJS } from 'react-native-reanimated'
import type BarcodeServiceInterface from '@/services/barcode/BarcodeServiceInterface'
import type { Barcode } from '@/services/barcode/types'
import BaseScreenWrapper from '@/components/screens/BaseScreenWrapper'
import BaseContentWrapper from '@/components/screens/BaseContentWrapper'

export const ScanScreenName = 'ScanScreen' as const
type ScanScreenProps = StackScreenProps<MainNavigatorParamList, typeof ScanScreenName>
export const ScanScreen: React.FC<ScanScreenProps> = ({ navigation }) => {
  const cameraService = useInjection<CameraServiceInterface>(Services.CameraService)
  const barcodeService = useInjection<BarcodeServiceInterface>(Services.BarcodeService)

  const [isCameraPermissionsGranted, setCameraPermissionsGranted] = useState(false)
  const [foundBarcode, setFoundBarcode] = useState<Barcode | null>(null)

  const processBarcodes = (barcodes: VisionCameraBarcode[]) => {
    const code = barcodeService.processRawData(barcodes)
    if (code) {
      setFoundBarcode(code)
    }
  }

  const frameProcessor = useFrameProcessor(frame => {
    'worklet'
    const detected = scanBarcodes(frame, [BarcodeFormat.ALL_FORMATS], { checkInverted: true })
    runOnJS(processBarcodes)(detected)
  }, [barcodeService])

  useEffect(() => {
    (async () => {
      setCameraPermissionsGranted(await cameraService.getOrRequestCameraPermissions())
    })()
  }, [cameraService])

  useEffect(() => {
    if (foundBarcode) {
      navigateToScanResults(foundBarcode)
    }
  }, [foundBarcode])

  const { back: backCamera } = useCameraDevices()

  const navigateToScanResults = (_barcode: Barcode) => {
    navigation.replace(ScanResultScreenName, { barcode: _barcode })
  }

  return (
    <BaseScreenWrapper>
      <BaseContentWrapper>
        {isCameraPermissionsGranted && backCamera ? (
          <Camera
            device={backCamera}
            style={StyleSheet.absoluteFill}
            isActive={true}
            frameProcessor={frameProcessor}
            frameProcessorFps={1}
          />
        ) : (
          <View>
            <Text>No permissions granted</Text>
          </View>
        )}
      </BaseContentWrapper>
    </BaseScreenWrapper>
  )
}
