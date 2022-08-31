import type { MMKVInstance } from 'react-native-mmkv-storage'
import { MMKVLoader } from 'react-native-mmkv-storage'
import type { ThemeTypeWithAuto } from '@/services/theme/types'
import { isThemeType } from '@/services/theme/types'
import { injectable } from 'inversify'
import mmkvFlipper from 'rn-mmkv-storage-flipper'

enum SettingsRepositoryKeys {
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

    if (__DEV__ && !process.env.JEST_WORKER_ID) {
      mmkvFlipper(this.storage)
    }
  }

  public getPreferredTheme(): ThemeTypeWithAuto {
    const value = this.storage.getString(SettingsRepositoryKeys.PREFERRED_THEME)
    if (isThemeType(value)) {
      return value
    }

    return 'auto'
  }

  public setPreferredTheme(theme: ThemeTypeWithAuto) {
    this.storage.setString(SettingsRepositoryKeys.PREFERRED_THEME, theme)
  }
}
