import { injectable } from 'inversify'
import type { ThemeTypeWithAuto } from '@/services/theme/types'

@injectable()
export default class SettingsRepository {
  private readonly key = 'SETTINGS'

  public getPreferredTheme(): ThemeTypeWithAuto {
    return 'auto'
  }

  public setPreferredTheme(theme: ThemeTypeWithAuto) {
    // Do nothing
  }
}
