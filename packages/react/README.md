# @langua/react

The Langua's adapter for React.

## Installation

Given your preferred package manager is Yarn

```bash
yarn install @langua/core @langua/react 
```

## Usage

Let's start by adding `LanguaProvider` to the React tree.

```tsx
import { langua } from '@langua/core'
import { LanguaProvider } from '@langua/react'

const l = langua({
    en: {
        'hello.world': 'Hello, world!',
        'hello.world.with.values': 'Hello, world! Today is {date}.'
    },
    it: {
        'hello.world': 'Ciao, mondo!',
    },
})

const App = () => (
    <LanguaProvider locale="en" langua={l}>
        <Child />
    </LanguaProvider>
)
```

You're good to go!

You can now access the translations in the following ways

### useTranslation

This hook gets a translation id and returns the related interpolated translation. Let's look a simple example:

```typescript
const TranslatedComponent = () => {
    const translation = useTranslation({ id: 'hello.world' })

    return <div>{translation}</div>
}
```

Easy as hell. 😈

Hey, maybe you need to interpolate some values... here it is!

```typescript
const TranslatedComponent = () => {
    const translation = useTranslation({ id: 'hello.world.with.values', values: { date: '42' } })

    return <div>{translation}</div>
}
```

### useLangua

Hey, maybe you need to access langua's primitives for complex use cases. The hook `useLangua` is what you need in this case

```typescript
const useAwesomeHook = () => {
    const { translate, setLocale } = useLangua()

    const getStaticTranslation = useCallback(() => translate({ id: 'hello.world' }), [translate])
    const changeLocale = useCallback((id: string) => setLocale(id), [setLocale])

    return { getStaticTranslation, changeLocale }
}
```

### Translation

You might like to translate your application by using just componenets: `Translation` is what you want then!

```typescript
const TranslatedComponent = () => (
    <>
        <Translation id="hello.world" />
        <Translation id="hello.world.with.values" values={{ date: '42' }} />
    </>
)
```

As you've seen, this component behaves similarly to `useTranslation`. It's just syntactic sugar after all (psssst, it wraps `useTranslation`)...

### withLangua

Last, but not least, we didn't forget Class Components! 😛

`withLangua` is a simple wrapper for Langua's primitives.

```typescript
class TranslatedComponent extends React.Component { 
    componentDidMount() {
        const { translate } = this.props

        alert(translate({ id: 'hello.world' }))
    }

    render() {
        return (
            <Translation id="hello.world" />
        )
    }
}

export const Translated = withLangua(TranslatedComponent)
```

Simple, isn't it?
