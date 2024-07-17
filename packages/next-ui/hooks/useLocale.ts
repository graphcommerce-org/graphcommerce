import { normalizeLocale } from '../utils/normalizeLocale'
import { useStorefrontConfig } from './useStorefrontConfig'

export function useLocale(): Intl.BCP47LanguageTag {
  const { locale } = useStorefrontConfig()
  return normalizeLocale(locale)
}
