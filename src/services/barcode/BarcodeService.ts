import type  { Barcode as VisionCameraBarcode, BarcodeFormat as VisionCameraBarcodeFormat } from 'vision-camera-code-scanner'
import type { Barcode, BarcodeFormat } from '@/services/barcode/types'
import { BARCODE_FORMAT_MAP } from '@/services/barcode/types'
import type BarcodeServiceInterface from '@/services/barcode/BarcodeServiceInterface'
import { injectable } from 'inversify'

@injectable()
export default class BarcodeService implements BarcodeServiceInterface {
  public processRawData(barcodes: VisionCameraBarcode[]): Barcode | null {
    if (Array.isArray(barcodes) && barcodes.length) {
      const { rawValue: code, format } = barcodes[0]
      const convertedFormat = this.convertBarcodeFormat(format)

      if (code && convertedFormat) {
        return { code, format: convertedFormat }
      }
    }

    return null
  }

  protected convertBarcodeFormat(visionCameraFormat: VisionCameraBarcodeFormat): BarcodeFormat | null {
    const found = Object.entries(BARCODE_FORMAT_MAP).find(([, f]) => f === visionCameraFormat)
    if (found) {
      return found[0] as BarcodeFormat
    }

    return null
  }
}
