import { useQuery } from '@graphcommerce/graphql'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { StoreConfigDocument } from '@graphcommerce/magento-store'

const showForGuest = !import.meta.graphCommerce.wishlistHideForGuests

/**
 * Checks whether the wishlist is enabled.
 *
 * Incorporates the configuration where the wishlist is hidden for guests.
 */
export function useWishlistEnabled() {
  const isEnabled =
    useQuery(StoreConfigDocument).data?.storeConfig?.magento_wishlist_general_is_enabled === '1'

  const { loggedIn } = useCustomerSession()
  return isEnabled && (showForGuest || loggedIn)
}
