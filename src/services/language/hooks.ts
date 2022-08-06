import { useInjection } from 'inversify-react'
import type LanguageServiceInterface from '@/services/language/LanguageServiceInterface'
import { Services } from '@/ioc/services'
import { useLayoutEffect, useState } from 'react'

export const useLanguageService = () => {
  const languageService = useInjection<LanguageServiceInterface>(Services.LanguageService)
  const [isInit, setIsInit] = useState(false)

  useLayoutEffect(() => {
    if (!languageService.isInitialized) {
      languageService.setOnInitCompleteListener(() => setIsInit(true))
    }

    setIsInit(true)
  }, [languageService])

  return {
    isInit,
  }
}
