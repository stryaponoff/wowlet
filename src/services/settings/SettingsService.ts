import type SettingsServiceInterface from '@/services/settings/SettingsServiceInterface'
import { inject, injectable } from 'inversify'
import { Services } from '@/ioc/services'
import type SettingsRepository from '@/repositories/SettingsRepository'
import type { ThemeTypeWithAuto } from '@/services/theme/types'

@injectable()
export default class SettingsService implements SettingsServiceInterface {
  constructor(
    @inject(Services.SettingsRepository) protected readonly repo: SettingsRepository,
  ) {}

  public getPreferredTheme(): ThemeTypeWithAuto {
    return this.repo.getPreferredTheme()
  }

  public setPreferredTheme(theme: ThemeTypeWithAuto): void {
    return this.repo.setPreferredTheme(theme)
  }
}
