import { useQuery } from '@graphcommerce/graphql'
import { WishlistItem } from '@graphcommerce/graphql-mesh'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { GetGuestWishlistProductsDocument } from '../queries/GetGuestWishlistProducts.gql'
import { GetWishlistProductsDocument } from '../queries/GetWishlistProducts.gql'
import { GuestWishlistDocument } from '../queries/GuestWishlist.gql'

export function useWishlistItems() {
  const { loggedIn } = useCustomerSession()

  let wishlistItems: (WishlistItem | null)[] | undefined

  /** Get customer wishlist from session */
  const customerWl = useQuery(GetWishlistProductsDocument, { ssr: false, skip: !loggedIn })

  /** Get guest wishlist items from cache and hydrate with catalog data */
  const guestWl = useQuery(GuestWishlistDocument, { ssr: false, skip: loggedIn })
  const guestSkus = guestWl.data?.guestWishlist?.items.map((item) => item?.sku) || []

  const guestProducts = useQuery(GetGuestWishlistProductsDocument, {
    ssr: false,
    variables: { filters: { sku: { in: guestSkus } } },
    skip: guestSkus.length === 0,
  })

  if (loggedIn) {
    wishlistItems = customerWl.data?.customer?.wishlists[0]?.items_v2?.items
  } else {
    wishlistItems = guestProducts.data?.products?.items || []
  }

  return {
    items: wishlistItems,
    loading: guestWl.loading || guestProducts.loading || customerWl.loading,
  }
}
