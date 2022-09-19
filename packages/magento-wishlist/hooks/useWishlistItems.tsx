import { QueryResult, useQuery } from '@graphcommerce/graphql'
import { Wishlist, WishlistItemInterface, WishlistItems } from '@graphcommerce/graphql-mesh'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { useEffect, useMemo, useState } from 'react'
import {
  GetGuestWishlistProductsDocument,
  GetGuestWishlistProductsQuery,
} from '../queries/GetGuestWishlistProducts.gql'
import {
  GetWishlistProductsDocument,
  GetWishlistProductsQuery,
} from '../queries/GetWishlistProducts.gql'
import { GuestWishlistDocument } from '../queries/GuestWishlist.gql'

export function useWishlistItems(): QueryResult<any> {
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

  const wishlistItems = useMemo(() => {
    // When loading the queries, data will return undefined. While we load the new data, we want
    // to return the previous data, to prevent the UI for going in a loading state
    if (loading && !loggedIn) return guestProducts.previousData?.products?.items
    if (loading && loggedIn) return customerWl.previousData?.customer?.wishlists[0]?.items_v2?.items

    if (loggedIn) return customerWl.data?.customer?.wishlists[0]?.items_v2?.items
    return guestProducts.data?.products?.items
  }, [
    customerWl.data?.customer?.wishlists,
    customerWl.previousData?.customer?.wishlists,
    guestProducts.data?.products?.items,
    guestProducts.previousData?.products?.items,
    loading,
    loggedIn,
  ])

  return {
    ...guestProducts,
    data: wishlistItems,
    loading,
  }
}
