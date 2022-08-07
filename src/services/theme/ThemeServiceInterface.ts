import type { Theme, ThemeType } from '@/services/theme/types'
import type { ColorValue, StatusBarStyle } from 'react-native'
import type { ThemeTypeWithAuto } from '@/services/theme/types'

export default interface ThemeServiceInterface {
  setSystemThemeType(value: ThemeType): void
  setPreferredThemeType(value: ThemeTypeWithAuto): void

  getThemeType(preferredThemeType: ThemeTypeWithAuto, systemThemeType: ThemeType): ThemeType
  getTheme(themeType: ThemeType): Theme
  getStatusBarColor(themeType: ThemeType): ColorValue
  getStatusBarStyle(themeType: ThemeType): StatusBarStyle

  getStatusBarColor(): ColorValue
  getStatusBarStyle(): StatusBarStyle
}
