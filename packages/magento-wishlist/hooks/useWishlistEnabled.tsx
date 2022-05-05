import { useQuery } from '@graphcommerce/graphql'
import { StoreConfigDocument } from '@graphcommerce/magento-store'

export function useWishlistEnabled() {
  const isEnabled =
    useQuery(StoreConfigDocument).data?.storeConfig?.magento_wishlist_general_is_enabled === '1'

  return isEnabled
}
