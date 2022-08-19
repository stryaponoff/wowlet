import type { PropsWithChildren } from 'react'
import React from 'react'
import { useLayoutEffect } from 'react'
import { observer } from 'mobx-react'
import { useInjection } from 'inversify-react'
import type { MainStore } from '@/services/store/MainStore'
import { Services } from '@/ioc/services'
import type SettingsServiceInterface from '@/services/settings/SettingsServiceInterface'
import { reaction } from 'mobx'
import type LanguageServiceInterface from '@/services/language/LanguageServiceInterface'

const MainStoreReactionProvider: React.FC<PropsWithChildren> = observer(({ children }) => {
  const mainStore = useInjection<MainStore>(Services.MainStore)
  const settingsService = useInjection<SettingsServiceInterface>(Services.SettingsService)
  const languageService = useInjection<LanguageServiceInterface>(Services.LanguageService)

  useLayoutEffect(() => {
    reaction(
      () => mainStore.preferredThemeType,
      value => {
        settingsService.setPreferredTheme(value)
      }
    )
  }, [mainStore, settingsService])

  useLayoutEffect(() => {
    reaction(
      () => mainStore.language,
      value => {
        languageService.changeLanguage(value)
      },
    )
  }, [mainStore, languageService])

  return (
    <>
      {children}
    </>
  )
})

export default MainStoreReactionProvider
