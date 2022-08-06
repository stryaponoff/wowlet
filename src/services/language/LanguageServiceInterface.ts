import type { Language } from '@/services/language/types'
import type { Callback, TFunction } from 'i18next'

export default interface LanguageServiceInterface {
  readonly isInitialized: boolean
  // init(): Promise<void>
  getDefaultLanguage(): Language
  changeLanguage(lng?: string, callback?: Callback): Promise<TFunction>
  setOnInitCompleteListener(callback: () => void): void
}
