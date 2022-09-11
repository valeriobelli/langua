import { interpolate } from './interpolate'
import type { Flatten, GetAvailableLocales, LocalesTranslations } from './types'

export interface Langua<Locale extends string | number | symbol, Translations extends LocalesTranslations> {
  addTranslations: <NewLocale extends string | number | symbol, LocaleTranslations extends Record<string, string>>(
    locale: NewLocale,
    translations: LocaleTranslations
  ) => Langua<Locale | NewLocale, Flatten<Translations & { [L in NewLocale]: LocaleTranslations }>>
  setLocale: <NextLocale extends GetAvailableLocales<Translations>>(
    locale: NextLocale
  ) => Langua<NextLocale, Translations>
  translate: {
    (args: { id: keyof Translations[Locale] }): string
    <Values extends Record<string, string>>(args: { id: keyof Translations[Locale]; values: Values }): string
  }
}

export const langua = <Translations extends LocalesTranslations, Locale extends GetAvailableLocales<Translations>>(
  translations: Translations,
  initialLocale: Locale
): Langua<Locale, Translations> => ({
  addTranslations<NewLocale extends string | number | symbol, LocaleTranslations extends Record<string, string>>(
    newLocale: NewLocale,
    localeTranslations: LocaleTranslations
  ): Langua<
    Locale | NewLocale,
    Flatten<
      Translations & {
        [L in NewLocale]: LocaleTranslations
      }
    >
  > {
    const cache: { [L in NewLocale]?: LocaleTranslations } = {}

    cache[newLocale] = localeTranslations

    return langua(Object.assign({}, Object.assign(translations, cache)), initialLocale)
  },
  setLocale<NextLocale extends GetAvailableLocales<Translations>>(
    locale: NextLocale
  ): Langua<NextLocale, Translations> {
    return langua(translations, locale)
  },
  translate(args: { id: keyof Translations[Locale]; values?: Record<string, string> }) {
    const translation = translations[initialLocale][args.id]

    if (!translation) {
      return String(args.id)
    }

    return interpolate({ translation, values: args.values || {} })
  },
})
