import 'reflect-metadata'
import SettingsService from '@/services/settings/SettingsService'
import type SettingsRepository from '@/repositories/SettingsRepository'

const SettingsRepoMock = {
  getPreferredTheme: jest.fn(),
  setPreferredTheme: jest.fn(),
} as unknown as SettingsRepository

describe('SettingsService', () => {
  const service = new SettingsService(SettingsRepoMock)

  it('should get preferred theme', () => {
    expect(SettingsRepoMock.getPreferredTheme).not.toBeCalled()
    service.getPreferredTheme()
    expect(SettingsRepoMock.getPreferredTheme).toBeCalled()
  })

  it('should set preferred theme', () => {
    expect(SettingsRepoMock.setPreferredTheme).not.toBeCalled()
    service.setPreferredTheme('auto')
    expect(SettingsRepoMock.setPreferredTheme).toBeCalled()
  })
})
