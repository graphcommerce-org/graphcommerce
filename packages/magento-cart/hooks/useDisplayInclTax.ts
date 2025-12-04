import { cartDisplayPricesInclTax } from '@graphcommerce/next-config/config'
import { useStorefrontConfig } from '@graphcommerce/next-ui'

export const useDisplayInclTax = () =>
  useStorefrontConfig().cartDisplayPricesInclTax ?? cartDisplayPricesInclTax ?? true
