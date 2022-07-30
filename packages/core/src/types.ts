export interface LocalesTranslations {
  [key: string | number | symbol]: Record<string, string>
}

export type GetAvailableLocales<DefinedTranslations extends LocalesTranslations> = keyof DefinedTranslations

export type Flatten<RecordLike extends Record<string, unknown>> = {
  [Key in keyof RecordLike]: RecordLike[Key]
} & unknown
