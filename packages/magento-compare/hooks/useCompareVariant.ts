import { useStorefrontConfig } from '@graphcommerce/next-ui'

export function useCompareVariant() {
  const compareCheckbox =
    useStorefrontConfig().compareCheckbox ?? import.meta.graphCommerce.compareCheckbox
  return compareCheckbox ? 'checkbox' : 'fab'
}
