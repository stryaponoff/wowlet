import type { ThemeTypeWithAuto } from '@/services/theme/types'

export default interface SettingsServiceInterface {
  getPreferredTheme(): ThemeTypeWithAuto
  setPreferredTheme(theme: ThemeTypeWithAuto): void
}
