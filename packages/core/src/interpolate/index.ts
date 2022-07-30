type InterpolateParam = {
  translation: string
  values: Record<string, string>
}

const valuesRegExp = /{(\w+?)}/g

export const interpolate = ({ translation, values }: InterpolateParam) =>
  translation.replace(valuesRegExp, (placeholder, key) => values[key] || placeholder)
