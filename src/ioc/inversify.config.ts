import { Container } from 'inversify'
import { Services } from '@/ioc/services'

import type CameraServiceInterface from '@/services/camera/CameraServiceInterface'
import CameraService from '@/services/camera/CameraService'

import type BarcodeServiceInterface from '@/services/barcode/BarcodeServiceInterface'
import BarcodeService from '@/services/barcode/BarcodeService'

import type ThemeServiceInterface from '@/services/theme/ThemeServiceInterface'
import ThemeService from '@/services/theme/ThemeService'

import type LanguageServiceInterface from '@/services/language/LanguageServiceInterface'
import LanguageService from '@/services/language/LanguageService'

import { MainStore } from '@/services/store/MainStore'
import { CardStore } from '@/services/store/CardStore'

const container = new Container()

container.bind<LanguageServiceInterface>(Services.LanguageService).to(LanguageService).inSingletonScope()
container.bind<CameraServiceInterface>(Services.CameraService).to(CameraService).inSingletonScope()
container.bind<BarcodeServiceInterface>(Services.BarcodeService).to(BarcodeService).inSingletonScope()
container.bind<ThemeServiceInterface>(Services.ThemeService).to(ThemeService).inSingletonScope()
container.bind<MainStore>(Services.MainStore).to(MainStore).inSingletonScope()
container.bind<CardStore>(Services.CardStore).to(CardStore).inSingletonScope()

export default container
