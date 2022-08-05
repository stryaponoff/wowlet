import { Barcode } from '@/services/barcode/types'
import { Barcode as VisionCameraBarcode } from 'vision-camera-code-scanner'

export default interface BarcodeServiceInterface {
  processRawData(barcodes: VisionCameraBarcode[]): Barcode | null
}
