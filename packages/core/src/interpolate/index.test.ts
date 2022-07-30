import { interpolate } from '.'

describe('interpolate', () => {
  it('yields the interpolated translation', () => {
    const translation = 'Foobar translation about {firstTopic} and {secondTopic}.'
    const interpolatedTranslation = interpolate({
      translation,
      values: { firstTopic: 'history', secondTopic: 'geography' },
    })

    expect(interpolatedTranslation).toBe('Foobar translation about history and geography.')
  })

  it('yields the original translation if no values are found', () => {
    const translation = 'Foobar translation about {firstTopic} and {secondTopic}.'
    const interpolatedTranslation = interpolate({
      translation,
      values: {},
    })

    expect(interpolatedTranslation).toBe(translation)
  })

  it('yields the a partially interpolated translation if only some values are found', () => {
    const translation = 'Foobar translation about {firstTopic} and {secondTopic}.'
    const interpolatedTranslation = interpolate({
      translation,
      values: { secondTopic: 'geography' },
    })

    expect(interpolatedTranslation).toBe('Foobar translation about {firstTopic} and geography.')
  })
})
