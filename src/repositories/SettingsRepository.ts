import type { MMKVInstance } from 'react-native-mmkv-storage'
import { MMKVLoader } from 'react-native-mmkv-storage'
import type { ThemeTypeWithAuto } from '@/services/theme/types'
import { isThemeType } from '@/services/theme/types'
import { injectable } from 'inversify'

enum SettingsRepoKeys {
  PREFERRED_THEME = 'preferredTheme',
}

@injectable()
export default class SettingsRepository {
  private readonly key = 'SETTINGS'
  private readonly storage: MMKVInstance

  constructor() {
    this.storage = new MMKVLoader()
      .withServiceName(this.key)
      .initialize()
  }

  public getPreferredTheme(): ThemeTypeWithAuto {
    const value = this.storage.getString(SettingsRepoKeys.PREFERRED_THEME)
    if (isThemeType(value)) {
      return value
    }

    return 'auto'
  }

  public setPreferredTheme(theme: ThemeTypeWithAuto) {
    this.storage.setString(SettingsRepoKeys.PREFERRED_THEME, theme)
  }
}
