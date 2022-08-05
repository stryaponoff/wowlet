import { Theme, ThemeType } from '@/services/theme/types'
import { Appearance, ColorValue, StatusBarStyle } from 'react-native'
import AppearanceListener = Appearance.AppearanceListener

export default interface ThemeServiceInterface {
  getLightTheme(): Theme
  getDarkTheme(): Theme
  getTheme(themeType: ThemeType): Theme

  getStatusBarColor(themeType: ThemeType): ColorValue
  getStatusBarStyle(themeType: ThemeType): StatusBarStyle

  subscribeThemeChange(onThemeChange: AppearanceListener): void
}
