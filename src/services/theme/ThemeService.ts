import { Appearance, ColorValue, StatusBarStyle } from 'react-native'
import { Theme, ThemeType } from '@/services/theme/types'
import ThemeServiceInterface from '@/services/theme/ThemeServiceInterface'
import merge from 'deepmerge'
import { MD3DarkTheme as PaperDarkTheme, MD3LightTheme as PaperDefaultTheme } from 'react-native-paper'
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationDefaultTheme } from '@react-navigation/native'
import { injectable } from 'inversify'

@injectable()
export default class ThemeService implements ThemeServiceInterface {
  public getLightTheme(): Theme {
    return merge(NavigationDefaultTheme, PaperDefaultTheme)
  }

  public getDarkTheme(): Theme {
    return merge(NavigationDarkTheme, PaperDarkTheme)
  }

  public getTheme(themeType: ThemeType): Theme {
    return themeType === 'dark'
      ? this.getDarkTheme()
      : this.getLightTheme()
  }

  public getStatusBarColor(themeType: ThemeType): ColorValue {
    return this.getTheme(themeType).colors.primary
  }

  public getStatusBarStyle(themeType: ThemeType): StatusBarStyle {
    return themeType === 'light' ? 'light-content' : 'dark-content'
  }

  public subscribeThemeChange(onThemeChange: Appearance.AppearanceListener): void {
    Appearance.addChangeListener(onThemeChange)
  }
}
