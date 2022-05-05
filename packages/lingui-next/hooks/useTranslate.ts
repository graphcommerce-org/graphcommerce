import { i18n } from '@lingui/core'

export type TransTemplateString = (
  literals: TemplateStringsArray,
  ...placeholders: ReadonlyArray<string | number | undefined | null>
) => string

export const t: TransTemplateString = (literals, ...placeholders) => {
  const str = literals.map((string, i) => (placeholders[i] ? `${string}{${i}}` : string)).join('')
  return i18n._(str, placeholders)
}
