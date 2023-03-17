import { useStorefrontConfig } from '@graphcommerce/next-ui'

export const useDisplayInclTax = () =>
  useStorefrontConfig().cartDisplayPricesInclTax ??
  import.meta.graphCommerce.cartDisplayPricesInclTax ??
  true
