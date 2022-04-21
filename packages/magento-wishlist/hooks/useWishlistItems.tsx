import { useQuery } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import {
  GuestWishlistDocument,
  GetWishlistProductsDocument,
  GetGuestWishlistProductsDocument,
} from '@graphcommerce/magento-wishlist'

export function useWishlistItems() {
  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid

  let wishlistItems

  /** Get customer wishlist from session */
  const { data: GetCustomerWishlistData, loading: loadingCustomerItems } = useQuery(
    GetWishlistProductsDocument,
    {
      skip: !isLoggedIn,
      ssr: false,
    },
  )

  /** Get guest wishlist items from cache and hydrate with catalog data */
  const { data: guestWishlistData, loading: loadingGuestWishlistData } = useQuery(
    GuestWishlistDocument,
    {
      ssr: false,
      skip: isLoggedIn === true,
    },
  )
  const guestData = guestWishlistData?.guestWishlist?.items.map((item) => item?.sku) || []

  const { data: productGuestItems, loading: loadingGuestItems } = useQuery(
    GetGuestWishlistProductsDocument,
    {
      ssr: false,
      variables: {
        filters: { sku: { in: guestData } },
      },
      skip: loadingGuestWishlistData || guestData.length === 0,
    },
  )

  if (isLoggedIn) {
    wishlistItems = GetCustomerWishlistData?.customer?.wishlists[0]?.items_v2?.items
  } else {
    wishlistItems = productGuestItems?.products?.items || []
  }

  return {
    items: wishlistItems,
    loading: loadingGuestWishlistData || loadingGuestItems || loadingCustomerItems,
  }
}
