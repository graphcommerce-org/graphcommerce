import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'

export function useFixedProductTaxes() {
  const { product_fixed_product_tax_display_setting: displaySetting = 'FPT_DISABLED' } =
    useQuery(StoreConfigDocument).data?.storeConfig ?? {}

  const subtractValue =
    displaySetting === 'EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS' ||
    displaySetting === 'EXCLUDE_FPT_WITHOUT_DETAILS'
  const showDetails =
    displaySetting === 'INCLUDE_FPT_WITH_DETAILS' ||
    displaySetting === 'EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS'
  const showFinalPrice = displaySetting === 'EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS'

  return {
    subtractValue,
    showDetails,
    showFinalPrice,
  }
}
