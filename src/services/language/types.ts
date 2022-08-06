const availableLanguages = [
  'en',
] as const
export type Language = typeof availableLanguages[number]
export const isLanguage = (value: unknown): value is Language => {
  return availableLanguages.some(lang => lang === value)
}

export type LanguageResources<NS extends string> = Record<Language, Record<NS, any>>
