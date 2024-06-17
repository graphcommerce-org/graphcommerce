import { normalizeLocale } from '@graphcommerce/lingui-next'
import { useStorefrontConfig } from './useStorefrontConfig'

export function useLocale(): Intl.BCP47LanguageTag {
  const { locale } = useStorefrontConfig()
  return normalizeLocale(locale)
}
