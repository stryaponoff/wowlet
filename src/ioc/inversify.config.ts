import { Container } from 'inversify'
import { Services } from '@/ioc/services'

import CameraServiceInterface from '@/services/camera/CameraServiceInterface'
import CameraService from '@/services/camera/CameraService'

import BarcodeServiceInterface from '@/services/barcode/BarcodeServiceInterface'
import BarcodeService from '@/services/barcode/BarcodeService'

import ThemeServiceInterface from '@/services/theme/ThemeServiceInterface'
import ThemeService from '@/services/theme/ThemeService'

const container = new Container()

container.bind<CameraServiceInterface>(Services.CameraService).to(CameraService).inSingletonScope()
container.bind<BarcodeServiceInterface>(Services.BarcodeService).to(BarcodeService).inSingletonScope()
container.bind<ThemeServiceInterface>(Services.ThemeService).to(ThemeService).inSingletonScope()

export default container
