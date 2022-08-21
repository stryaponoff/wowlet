import 'reflect-metadata'
import ThemeService from '@/services/theme/ThemeService'
import type { Theme } from '@/services/theme/types'

const darkPrimaryColor = 'dark-primary-color'
const lightPrimaryColor = 'light-primary-color'

const darkThemeMock = {
  dark: true,
  colors: {
    primary: darkPrimaryColor,
  },
} as Theme

const lightThemeMock = {
  dark: false,
  colors: {
    primary: lightPrimaryColor,
  },
} as Theme

describe('ThemeService', () => {
  const service = new ThemeService(darkThemeMock, lightThemeMock)

  it('should return correct theme', () => {
    expect(service.getTheme('dark')).toEqual(darkThemeMock)
    expect(service.getTheme('light')).toEqual(lightThemeMock)
  })

  it('should return correct theme type', () => {
    expect(service.getThemeType('dark', 'light')).toEqual('dark')
    expect(service.getThemeType('light', 'dark')).toEqual('light')
    expect(service.getThemeType('auto', 'light')).toEqual('light')
    expect(service.getThemeType('auto', 'dark')).toEqual('dark')
  })

  it('should return correct status bar color', () => {
    expect(service.getStatusBarColor('dark')).toEqual(darkPrimaryColor)
    expect(service.getStatusBarColor('light')).toEqual(lightPrimaryColor)
  })

  it('should return correct status bar style', () => {
    expect(service.getStatusBarStyle('light')).toEqual('light-content')
    expect(service.getStatusBarStyle('dark')).toEqual('dark-content')
  })
})
