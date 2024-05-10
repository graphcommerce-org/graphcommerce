import { normalizeLocale } from '@graphcommerce/lingui-next'
import { useStorefrontConfig } from './useStorefrontConfig'

export function useLocale() {
  const { locale } = useStorefrontConfig()
  return normalizeLocale(locale)
}
