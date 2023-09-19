import { QueryResult, useQuery } from '@graphcommerce/graphql'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { nonNullable } from '@graphcommerce/next-ui'
import {
  GetGuestWishlistProductsDocument,
  GetGuestWishlistProductsQuery,
} from '../queries/GetGuestWishlistProducts.gql'
import {
  GetWishlistProductsDocument,
  GetWishlistProductsQuery,
} from '../queries/GetWishlistProducts.gql'
import { GuestWishlistDocument } from '../queries/GuestWishlist.gql'

export type ConfigurableOptions =
  | {
      configurable_options?:
        | {
            configurable_product_option_value_uid: string | null | undefined
            value_label: string | null | undefined
          }[]
        | null
        | undefined
    }
  | null
  | undefined
export type GuestWishListItem =
  | (Omit<
      NonNullable<NonNullable<GetGuestWishlistProductsQuery['products']>['items']>[0],
      'configurable_options'
    > &
      ConfigurableOptions)
  | undefined
  | null
export type CustomerWishListItem =
  | NonNullable<
      NonNullable<
        NonNullable<NonNullable<GetWishlistProductsQuery['customer']>['wishlists'][0]>['items_v2']
      >['items']
    >[0]
  | undefined
  | null

export type GuestWishListData = GuestWishListItem[] | undefined | null
export type CustomerWishListData = CustomerWishListItem[] | undefined | null

type WishListData = GuestWishListData | CustomerWishListData | undefined | null

export function useWishlistItems(): Omit<QueryResult<GetGuestWishlistProductsQuery>, 'data'> & {
  data: WishListData
} {
  const { loggedIn } = useCustomerSession()
  let wishlistItems: CustomerWishListData = []
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

  // When loading the queries, data will return undefined. While we load the new data, we want
  // to return the previous data, to prevent the UI for going in a loading state
  if (loading && loggedIn)
    wishlistItems = customerWl.previousData?.customer?.wishlists[0]?.items_v2?.items

  if (!loading && loggedIn) wishlistItems = customerWl.data?.customer?.wishlists[0]?.items_v2?.items

  // Create own guestWishlist by combining cache data and the data we queried using the SKU's we got from the cache.
  let guestWishlist: GuestWishListData = guestWl.data?.guestWishlist?.items.map((guestItem) => {
    const guestProduct = guestProducts.data?.products?.items?.find(
      (product) => guestItem.sku === product?.sku,
    )

    // Add configurable_options to guestProduct if it is not null or undefined.
    if (guestProduct !== null && guestProduct !== undefined) {
      const configurable_options = guestItem?.selected_options
        ?.filter(nonNullable)
        .map((selected_option, i) => ({
          configurable_product_option_value_uid: selected_option,
          value_label: guestItem?.selected_options_labels?.[i],
        }))
      const guestWishlistItem: GuestWishListItem = {
        ...guestProduct,
        configurable_options: configurable_options || [],
      }
      return guestWishlistItem
    }
    return guestProduct
  })

  if (loading && !loggedIn)
    guestWishlist = guestProducts.previousData?.products?.items as GuestWishListData

  return {
    ...guestProducts,
    data: !loading && !loggedIn ? guestWishlist : wishlistItems,
    loading,
  }
}
