import type { MD3Theme as PaperTheme } from 'react-native-paper/lib/typescript/types'
import type { Theme as NavigationTheme } from '@react-navigation/native/lib/typescript/src/types'

export type Theme = PaperTheme & NavigationTheme

const themeTypes = ['dark', 'light'] as const
export type ThemeType = typeof themeTypes[number]
export const isThemeType = (value: unknown): value is ThemeType => {
  return themeTypes.some(i => i === value)
}

export type ThemeTypeWithAuto = ThemeType | 'auto'
