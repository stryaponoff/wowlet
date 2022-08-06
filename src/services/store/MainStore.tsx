import { action, makeAutoObservable, reaction } from 'mobx'
import { inject, injectable } from 'inversify'
import { Services } from '@/ioc/services'
import type LanguageService from '@/services/language/LanguageService'
import type { Language } from '@/services/language/types'

@injectable()
export class MainStore {
  public language: Language

  public setLanguage = action((value: Language): void => {
    this.language = value
  })

  public counter = 0

  public incrementCounter = action((): void => {
    this.counter++
  })

  constructor(
    @inject(Services.LanguageService) protected readonly languageService: LanguageService
  ) {
    this.language = languageService.getDefaultLanguage()
    makeAutoObservable(this)
    // makePersistable(this, {
    //   name: 'main',
    //   properties: ['language', '_configuredDevices'],
    //   storage: AsyncStorage,
    //   debugMode: __DEV__,
    // })

    reaction(
      () => this.language,
      value => {
        this.languageService.changeLanguage(value)
      },
    )
  }
}
