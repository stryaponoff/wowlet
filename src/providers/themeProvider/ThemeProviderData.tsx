import { Theme } from '@/services/theme/types'
import { ColorValue, StatusBarStyle } from 'react-native'

export type ThemeProviderData = {
  currentTheme: Theme
  statusBarColor: ColorValue
  statusBarStyle: StatusBarStyle
}
