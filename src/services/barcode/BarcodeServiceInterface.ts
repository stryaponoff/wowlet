import type { Barcode } from '@/services/barcode/types'
import type { Barcode as VisionCameraBarcode } from 'vision-camera-code-scanner'

export default interface BarcodeServiceInterface {
  processRawData(barcodes: VisionCameraBarcode[]): Barcode | null
}
