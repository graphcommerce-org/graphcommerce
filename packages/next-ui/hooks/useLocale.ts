import { normalizeLocale } from '../utils/normalizeLocale'
import { useStorefrontConfig } from './useStorefrontConfig'

export function useLocale(): Intl.UnicodeBCP47LocaleIdentifier {
  const { locale } = useStorefrontConfig()
  return normalizeLocale(locale)
}
