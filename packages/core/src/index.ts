import { interpolate } from './interpolate'
import type { Flatten, GetAvailableLocales, LocalesTranslations } from './types'

type TranslationOptions<DefinedTranslations extends Record<string, string>> =
  | {
      id: keyof DefinedTranslations
    }
  | {
      id: keyof DefinedTranslations
      values: Record<string, string>
    }

export interface Langua<Locale extends string | number | symbol, Translations extends LocalesTranslations> {
  addTranslations: <NewLocale extends string | number | symbol, LocaleTranslations extends Record<string, string>>(
    locale: NewLocale,
    translations: LocaleTranslations
  ) => Langua<Locale | NewLocale, Flatten<Translations & { [L in NewLocale]: LocaleTranslations }>>
  setLocale: <NextLocale extends GetAvailableLocales<Translations>>(
    locale: NextLocale
  ) => Langua<NextLocale, Translations>
  translate: (options: TranslationOptions<Translations[Locale]>) => string
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
  translate(options) {
    const translation = translations[initialLocale][options.id]

    if (!translation) {
      return String(options.id)
    }

    return interpolate({ translation, values: 'values' in options ? options.values : {} })
  },
})
