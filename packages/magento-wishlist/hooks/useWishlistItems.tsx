import { QueryResult, useQuery } from '@graphcommerce/graphql'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { Exact } from '@graphcommerce/next-config'
import {
  GetGuestWishlistProductsDocument,
  GetGuestWishlistProductsQuery,
} from '../queries/GetGuestWishlistProducts.gql'
import {
  GetWishlistProductsDocument,
  GetWishlistProductsQuery,
} from '../queries/GetWishlistProducts.gql'
import { GuestWishlistDocument, GuestWishlistQuery } from '../queries/GuestWishlist.gql'

export type GuestWishListData = NonNullable<GetGuestWishlistProductsQuery['products']>['items']
type CustomerWishListData = NonNullable<
  NonNullable<NonNullable<GetWishlistProductsQuery['customer']>['wishlists'][0]>['items_v2']
>['items']

type WishListData = GuestWishListData | CustomerWishListData

export function useWishlistItems(): Omit<QueryResult<GetGuestWishlistProductsQuery>, 'data'> & {
  data: WishListData
  guestWishlist: QueryResult<
    GuestWishlistQuery,
    Exact<{
      [key: string]: never
    }>
  >
} {
  const { loggedIn } = useCustomerSession()
  let wishlistItems: WishListData = []
  /** Get customer wishlist from session */
  const customerWl = useQuery(GetWishlistProductsDocument, { ssr: false, skip: !loggedIn })

  /** Get guest wishlist items from cache and hydrate with catalog data */
  const guestWl = useQuery(GuestWishlistDocument, { ssr: false, skip: loggedIn })
  console.log(30, guestWl)
  const guestSkus = guestWl.data?.guestWishlist?.items.map((item) => item?.sku) || []

  const guestProducts = useQuery(GetGuestWishlistProductsDocument, {
    ssr: false,
    variables: { filters: { sku: { in: guestSkus } } },
    skip: guestSkus.length === 0,
  })

  const loading = guestWl.loading || guestProducts.loading || customerWl.loading

  // When loading the queries, data will return undefined. While we load the new data, we want
  // to return the previous data, to prevent the UI for going in a loading state
  if (loading && !loggedIn) wishlistItems = guestProducts.previousData?.products?.items
  if (loading && loggedIn)
    wishlistItems = customerWl.previousData?.customer?.wishlists[0]?.items_v2?.items

  if (!loading && loggedIn) wishlistItems = customerWl.data?.customer?.wishlists[0]?.items_v2?.items
  if (!loading && !loggedIn) wishlistItems = guestProducts.data?.products?.items

  return {
    ...guestProducts,
    data: wishlistItems,
    guestWishlist: guestWl,
    loading,
  }
}
