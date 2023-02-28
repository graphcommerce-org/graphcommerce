import { useI18nConfig } from '@graphcommerce/next-ui'

export function useGoogleTagmanagerId() {
  const id = useI18nConfig().googleTagmanagerId ?? import.meta.graphCommerce.googleTagmanagerId
  if (!id) throw new Error('No googleTagmanagerId found in config')
  return id
}
