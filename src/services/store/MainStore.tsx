import { action, makeAutoObservable } from 'mobx'
import { inject, injectable } from 'inversify'
import { Services } from '@/ioc/services'
import type LanguageService from '@/services/language/LanguageService'
import type { Language } from '@/services/language/types'
import type { Theme, ThemeType, ThemeTypeWithAuto } from '@/services/theme/types'
import type ThemeService from '@/services/theme/ThemeService'
import type { ColorValue, StatusBarStyle } from 'react-native'
import { Appearance } from 'react-native'
import type SettingsServiceInterface from '@/services/settings/SettingsServiceInterface'

@injectable()
export class MainStore {
  public language: Language
  public setLanguage = action((value: Language): void => {
    this.language = value
  })

  public systemThemeType: ThemeType = Appearance.getColorScheme() ?? 'light'
  public setSystemThemeType = action((value: ThemeType): void => {
    this.systemThemeType = value
  })

  public preferredThemeType: ThemeTypeWithAuto
  public setPreferredThemeType = action((value: ThemeTypeWithAuto): void => {
    this.preferredThemeType = value
  })

  public get themeType(): ThemeType {
    return this.themeService.getThemeType(this.preferredThemeType, this.systemThemeType)
  }

  public get theme(): Theme {
    return this.themeService.getTheme(this.themeType)
  }

  public get statusBarColor(): ColorValue {
    return this.themeService.getStatusBarColor(this.themeType)
  }

  public get statusBarStyle(): StatusBarStyle {
    return this.themeService.getStatusBarStyle(this.themeType)
  }

  constructor(
    @inject(Services.ThemeService) protected readonly themeService: ThemeService,
    @inject(Services.LanguageService) protected readonly languageService: LanguageService,
    @inject(Services.SettingsService) protected readonly settingsService: SettingsServiceInterface
  ) {
    Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) {
        this.setSystemThemeType(colorScheme)
      }
    })

    this.language = languageService.getDefaultLanguage()
    this.preferredThemeType = this.settingsService.getPreferredTheme()

    makeAutoObservable(this)
  }
}
