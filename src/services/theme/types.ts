import type { MD3Theme as PaperTheme } from 'react-native-paper/lib/typescript/types'
import type { Theme as NavigationTheme } from '@react-navigation/native/lib/typescript/src/types'

export type Theme = PaperTheme & NavigationTheme

export type ThemeType = 'dark' | 'light'
export type ThemeTypeWithAuto = ThemeType | 'auto'
