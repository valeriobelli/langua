# @langua/core

The dependency-free framework-agnostic type-safe core package of Langua.

## Installation

Given your preferred package manager is Yarn

```bash
yarn install @langua/core
```

## Usage

```typescript
import { langua } from '@langua/core'

const i18n = langua({
    en: {
        'hello.world': 'Hello, world!',
        'hello.world.with.values': 'Hello, world! Today is {date}.'
    },
    it: {
        'hello.world': 'Ciao, mondo!',
    },
})

// Access to the translations
console.log(i18n.translate({ id: 'hello.world' }))
console.log(i18n.translate({ id: 'hello.world', values: { date: new Date().toJSON() } }))

// Change the current locale
const i18nIt = i18n.setLocale('it')

// Add new locale with the related translations
const i18nWithFrench = i18n.addTranslations('fr', { 'hello.world': 'Bonjour, le monde !' })
```
