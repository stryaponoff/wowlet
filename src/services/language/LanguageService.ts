import 'intl-pluralrules'
import type { Callback, TFunction } from 'i18next'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import messagesEn from '@/i18n/en/messages.json'
import formEn from '@/i18n/en/form.json'
import type { Language, LanguageResources } from '@/services/language/types'
import { isLanguage } from '@/services/language/types'
import type LanguageServiceInterface from '@/services/language/LanguageServiceInterface'
import { NativeModules, Platform } from 'react-native'
import { injectable } from 'inversify'

@injectable()
export default class LanguageService implements LanguageServiceInterface {
  private _isInitialized = false
  private onInitCompleteListener: (() => void) |  undefined

  public get isInitialized(): boolean {
    return this._isInitialized
  }

  constructor(
    protected readonly i18n = i18next,
    protected readonly namespaceSeparator = ':',
    protected readonly keySeparator = '.',
    protected readonly fallbackLanguage: Language = 'en',
    protected readonly namespaces = [
      'default', 'form',
    ] as const
  ) {
    const lng: Language = this.getDefaultLanguage()
    const defaultNamespace: typeof this.namespaces[number] = 'default'
    const resources: LanguageResources<typeof this.namespaces[number]> = {
      en: {
        default: messagesEn,
        form: formEn,
      },
    }

    this.i18n.use(initReactI18next).init({
      lng,
      fallbackLng: this.fallbackLanguage,
      ns: this.namespaces,
      defaultNS: defaultNamespace,

      nsSeparator: this.namespaceSeparator,
      keySeparator: this.keySeparator,

      resources,

      interpolation: {
        escapeValue: false,
      },
    }, () => {
      this._isInitialized = true

      if (this.onInitCompleteListener) {
        this.onInitCompleteListener()
      }
    })
  }

  public getDefaultLanguage(): Language {
    const systemLocale: string =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale
        : NativeModules.I18nManager.localeIdentifier

    const systemLanguage = systemLocale.slice(0, 2).toLowerCase()
    const defaultLanguage: Language = isLanguage(systemLanguage)
      ? systemLanguage
      : 'en'

    return defaultLanguage
  }

  public async changeLanguage(lng?: string, callback?: Callback): Promise<TFunction> {
    return this.i18n.changeLanguage(lng, callback)
  }

  public setOnInitCompleteListener(callback: () => void): void {
    this.onInitCompleteListener = callback
  }
}
