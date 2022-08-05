import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { MainNavigatorParamList } from '@/navigation/MainNavigator'
import { useCameraDevices, useFrameProcessor } from 'react-native-vision-camera'
import { Barcode as VisionCameraBarcode, BarcodeFormat, scanBarcodes } from 'vision-camera-code-scanner'
import { ScanResultScreenName } from './ScanResultScreen'
import { useInjection } from 'inversify-react'
import CameraServiceInterface from '@/services/camera/CameraServiceInterface'
import { Services } from '@/ioc/services'
import { Text } from 'react-native-paper'
import { runOnJS } from 'react-native-reanimated'
import BarcodeServiceInterface from '@/services/barcode/BarcodeServiceInterface'
import { Barcode } from '@/services/barcode/types'
import BaseScreenWrapper from '@/components/screens/BaseScreenWrapper'
import BaseContentWrapper from '@/components/screens/BaseContentWrapper'

export const ScanScreenName = 'ScanScreen' as const
type ScanScreenProps = StackScreenProps<MainNavigatorParamList, typeof ScanScreenName>
export const ScanScreen: React.FC<ScanScreenProps> = ({ navigation }) => {
  const cameraService = useInjection<CameraServiceInterface>(Services.CameraService)
  const barcodeService = useInjection<BarcodeServiceInterface>(Services.BarcodeService)

  const [isCameraPermissionsGranted, setCameraPermissionsGranted] = useState(false)

  const processBarcodes = (barcodes: VisionCameraBarcode[]) => {
    const code = barcodeService.processRawData(barcodes)
    if (code) {
      navigateToScanResults(code)
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

  const { back: backCamera } = useCameraDevices()

  const navigateToScanResults = (_barcode: Barcode) => {
    navigation.replace(ScanResultScreenName, { barcode: _barcode })
  }

  return (
      <BaseScreenWrapper>
        <BaseContentWrapper>
          {isCameraPermissionsGranted && backCamera ? (
            // <Camera
            //   device={backCamera}
            //   style={StyleSheet.absoluteFill}
            //   isActive={true}
            //   frameProcessor={frameProcessor}
            //   frameProcessorFps={1}
            // />
            <View style={{ flex: 1, backgroundColor: '#000' }} />
          ) : (
            <View>
              <Text>No permissions granted</Text>
            </View>
          )}
        </BaseContentWrapper>
      </BaseScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 8,
  },
})
