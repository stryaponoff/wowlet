import type { ColorValue, StatusBarStyle } from 'react-native'
import type { Theme, ThemeType, ThemeTypeWithAuto } from '@/services/theme/types'
import type ThemeServiceInterface from '@/services/theme/ThemeServiceInterface'
import merge from 'deepmerge'
import { MD3DarkTheme as PaperDarkTheme, MD3LightTheme as PaperDefaultTheme } from 'react-native-paper'
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native'
import { injectable } from 'inversify'

@injectable()
export default class ThemeService implements ThemeServiceInterface {
  constructor(
    private readonly darkTheme: Theme = merge(NavigationDarkTheme, PaperDarkTheme),
    private readonly lightTheme: Theme = merge(NavigationDefaultTheme, PaperDefaultTheme),
  ) {}

  public getTheme(themeType: ThemeType): Theme {
    return themeType === 'dark'
      ? this.darkTheme
      : this.lightTheme
  }

  public getStatusBarColor(themeType: ThemeType): ColorValue {
    return this.getTheme(themeType).colors.primary
  }

  public getStatusBarStyle(themeType: ThemeType): StatusBarStyle {
    return themeType === 'light' ? 'light-content' : 'dark-content'
  }

  public getThemeType(preferredThemeType: ThemeTypeWithAuto, systemThemeType: ThemeType): ThemeType {
    if (preferredThemeType === 'auto') {
      return systemThemeType
    }

    return preferredThemeType
  }
}
