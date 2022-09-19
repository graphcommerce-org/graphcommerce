import { QueryResult, useQuery } from '@graphcommerce/graphql'
import { Wishlist, WishlistItemInterface, WishlistItems } from '@graphcommerce/graphql-mesh'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { useEffect, useState } from 'react'
import {
  GetGuestWishlistProductsDocument,
  GetGuestWishlistProductsQuery,
} from '../queries/GetGuestWishlistProducts.gql'
import {
  GetWishlistProductsDocument,
  GetWishlistProductsQuery,
} from '../queries/GetWishlistProducts.gql'
import { GuestWishlistDocument } from '../queries/GuestWishlist.gql'

type WishListState =
  | NonNullable<GetGuestWishlistProductsQuery['products']>['items']
  | NonNullable<
      NonNullable<NonNullable<GetWishlistProductsQuery['customer']>['wishlists'][0]>['items_v2']
    >['items']

export function useWishlistItems(): QueryResult<any> {
  const [wishlistItems, setWishlistItems] = useState<WishListState>()
  const { loggedIn } = useCustomerSession()

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

  const loading = guestWl.loading || guestProducts.loading || customerWl.loading

  useEffect(() => {
    setWishlistItems((prev) => {
      if (loading) return prev
      if (loggedIn) return customerWl.data?.customer?.wishlists[0]?.items_v2?.items
      return guestProducts.data?.products?.items || []
    })
  }, [customerWl.data?.customer?.wishlists, guestProducts.data?.products?.items, loading, loggedIn])

  return {
    ...guestProducts,
    data: wishlistItems,
    loading,
  }
}
