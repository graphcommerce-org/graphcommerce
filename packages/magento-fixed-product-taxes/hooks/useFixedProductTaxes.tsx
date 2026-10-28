import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'

export type FptDisplaySetting =
  | 'FPT_DISABLED'
  | 'INCLUDE_FPT_WITHOUT_DETAILS'
  | 'INCLUDE_FPT_WITH_DETAILS'
  | 'EXCLUDE_FPT_WITHOUT_DETAILS'
  | 'EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS'

export function useFixedProductTaxes() {
  const displaySetting = (useQuery(StoreConfigDocument).data?.storeConfig
    ?.product_fixed_product_tax_display_setting ?? 'FPT_DISABLED') as FptDisplaySetting

  const subtractValue =
    displaySetting === 'EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS' ||
    displaySetting === 'EXCLUDE_FPT_WITHOUT_DETAILS'
  const showDetails =
    displaySetting === 'INCLUDE_FPT_WITH_DETAILS' ||
    displaySetting === 'EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS'
  const showFinalPrice = displaySetting === 'EXCLUDE_FPT_AND_INCLUDE_WITH_DETAILS'

  return {
    displaySetting,
    subtractValue,
    showDetails,
    showFinalPrice,
  }
}
