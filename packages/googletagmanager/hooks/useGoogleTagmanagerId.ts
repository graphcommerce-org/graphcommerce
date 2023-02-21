import { useI18nConfig } from '@graphcommerce/next-ui'

export function useGoogleTagmanagerId() {
  return useI18nConfig().googleTagmanagerId ?? import.meta.graphCommerce.googleTagmanagerId
}
