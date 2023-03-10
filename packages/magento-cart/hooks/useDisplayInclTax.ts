import { useI18nConfig } from '@graphcommerce/next-ui'

export const useDisplayInclTax = () =>
  useI18nConfig().cartDisplayPricesInclTax ??
  import.meta.graphCommerce.cartDisplayPricesInclTax ??
  true
