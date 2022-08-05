import { BarcodeFormat as VisionCameraBarcodeFormat } from 'vision-camera-code-scanner'

export const BARCODE_FORMAT_MAP: Record<BarcodeFormat, VisionCameraBarcodeFormat> = {
  'ITF': VisionCameraBarcodeFormat.ITF,
  'CODE39': VisionCameraBarcodeFormat.CODE_39,
  'CODE128': VisionCameraBarcodeFormat.CODE_128,
  'EAN13': VisionCameraBarcodeFormat.EAN_13,
  'EAN8': VisionCameraBarcodeFormat.EAN_8,
  'UPC': VisionCameraBarcodeFormat.UPC_A,
  'UPCE': VisionCameraBarcodeFormat.UPC_E,
  'codabar': VisionCameraBarcodeFormat.CODABAR,
  'QR': VisionCameraBarcodeFormat.QR_CODE,
}

export type BarcodeFormat =
  | 'ITF'
  | 'CODE39'
  | 'CODE128'
  | 'EAN13'
  | 'EAN8'
  | 'UPC'
  | 'UPCE'
  | 'codabar'
  | 'QR'

export type Barcode = {
  code: string
  format: BarcodeFormat
}
