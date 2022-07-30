import { Langua, langua } from '.'

const translations = {
  en: {
    foo: 'foo EN',
    fooWithValues: 'Hello, world! This is a {value}!',
  },
  it: {
    bar: 'bar',
    foo: 'foo IT',
  },
}

type Translations = typeof translations
type Locale = keyof Translations

describe('langua', () => {
  it('permits to retrive the translations of the defined locale', () => {
    const i18n = langua(translations, 'en')

    expect(i18n.translate({ id: 'foo' })).toBe('foo EN')
    expect(i18n.translate({ id: 'fooWithValues', values: { value: 'Supah value' } })).toBe(
      'Hello, world! This is a Supah value!'
    )
  })

  it('returns the translation key in case it does not exist', () => {
    const i18n = langua(translations, 'en')

    expect(i18n.translate({ id: 'foo.bar' } as never)).toBe('foo.bar')
  })

  it('permits to change the current locale', () => {
    let i18n: Langua<Locale, Translations> = langua(translations, 'en')

    expect(i18n.translate({ id: 'foo' })).toBe('foo EN')

    i18n = i18n.setLocale('it')

    expect(i18n.translate({ id: 'foo' })).toBe('foo IT')
  })

  it('permits to add new locales with the related translations', () => {
    const i18n = langua(translations, 'en')

    const i18nWithFrench = i18n.addTranslations('fr', { foo: 'foo FR' }).setLocale('fr')

    expect(i18nWithFrench.translate({ id: 'foo' })).toBe('foo FR')
  })
})
