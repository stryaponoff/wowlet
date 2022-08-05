import React, { createContext, PropsWithChildren, useLayoutEffect, useState } from 'react'
import { useInjection } from 'inversify-react'
import { Services } from '@/ioc/services'
import ThemeServiceInterface from '@/services/theme/ThemeServiceInterface'
import { ThemeType } from '@/services/theme/types'
import type { ThemeProviderData } from '@/providers/themeProvider/ThemeProviderData'

export const ThemeContext = createContext<ThemeProviderData | undefined>(undefined)

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const themeService = useInjection<ThemeServiceInterface>(Services.ThemeService)
  const [systemThemeType, setSystemThemeType] = useState<ThemeType>('light')

  useLayoutEffect(() => {
    themeService.subscribeThemeChange(preferences => {
      if (preferences.colorScheme) {
        setSystemThemeType(preferences.colorScheme)
      }
    })
  })

  return (
    <ThemeContext.Provider value={{
      currentTheme: themeService.getTheme(systemThemeType),
      statusBarColor: themeService.getStatusBarColor(systemThemeType),
      statusBarStyle: themeService.getStatusBarStyle(systemThemeType),
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
