import { useStorefrontConfig } from '@graphcommerce/next-ui'

export type CompareVariant = 'checkbox' | 'fab'

export function useCompareVariant(): CompareVariant {
  const compareCheckbox =
    useStorefrontConfig().compareCheckbox ?? import.meta.graphCommerce.compareCheckbox
  return compareCheckbox ? 'checkbox' : 'fab'
}
