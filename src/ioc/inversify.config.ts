import { Container } from 'inversify'
import { Services } from '@/ioc/services'
import 'reflect-metadata'

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

import SettingsRepository from '@/repositories/SettingsRepository'
import type SettingsServiceInterface from '@/services/settings/SettingsServiceInterface'
import SettingsService from '@/services/settings/SettingsService'

import CardRepository from '@/repositories/CardRepository'
import type CardServiceInterface from '@/services/card/CardServiceInterface'
import CardService from '@/services/card/CardService'

const container = new Container()

container.bind<LanguageServiceInterface>(Services.LanguageService).to(LanguageService).inSingletonScope()
container.bind<CameraServiceInterface>(Services.CameraService).to(CameraService).inSingletonScope()
container.bind<BarcodeServiceInterface>(Services.BarcodeService).to(BarcodeService).inSingletonScope()
container.bind<ThemeServiceInterface>(Services.ThemeService).to(ThemeService).inSingletonScope()
container.bind<MainStore>(Services.MainStore).to(MainStore).inSingletonScope()
container.bind<CardStore>(Services.CardStore).to(CardStore).inSingletonScope()
container.bind<SettingsRepository>(Services.SettingsRepository).to(SettingsRepository).inSingletonScope()
container.bind<SettingsServiceInterface>(Services.SettingsService).to(SettingsService).inSingletonScope()
container.bind<CardRepository>(Services.CardRepository).to(CardRepository).inSingletonScope()
container.bind<CardServiceInterface>(Services.CardService).to(CardService).inSingletonScope()

export default container
