/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  useMutation,
  useQuery,
  useApolloClient,
  GuestWishlist,
  GuestWishlistItem,
} from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import {
  AddProductToWishlistDocument,
  GuestWishlistDocument,
  GetGuestWishlistProductsDocument,
} from '@graphcommerce/magento-wishlist'
import { useEffect } from 'react'

/** Merge guest wishlist items to customer session upon login */
export function useMergeGuestWishlistWithCustomer() {
  const customerToken = useQuery(CustomerTokenDocument)?.data?.customerToken
  const isLoggedIn = customerToken?.token && customerToken?.valid
  const { cache } = useApolloClient()

  const guestWishlistData = useQuery(GuestWishlistDocument, {
    ssr: false,
  }).data?.guestWishlist

  const guestDataSkus = guestWishlistData?.items.map((item) => item?.sku) || []
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validatedItems =
    useQuery(GetGuestWishlistProductsDocument, {
      ssr: false,
      variables: {
        filters: { sku: { in: guestDataSkus } },
      },
      skip: guestDataSkus.length === 0,
    }).data?.products?.items?.map((item) => item?.sku) || []

  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)

  useEffect(() => {
    if (!isLoggedIn) return

    console.log(guestDataSkus.length)

    if (!guestDataSkus.length) return

    console.log(validatedItems.length)

    if (!validatedItems.length) {
      /** Only outdated items were found, purge them */
      cache.evict({
        id: cache.identify({ __typename: 'GuestWishlist' }),
      })
      return
    }

    const wishlist =
      guestWishlistData?.items.filter((item) => validatedItems.includes(item.sku)) || []

    if (!wishlist.length) return

    const payload = wishlist.map((item) => ({
      sku: item.sku,
      selected_options: item.selected_options,
      quantity: item.quantity,
    }))

    cache.evict({
      id: cache.identify({ __typename: 'GuestWishlist' }),
    })
    addWishlistItem({ variables: { input: payload } })
  }, [guestWishlistData, guestDataSkus, validatedItems, addWishlistItem, cache, isLoggedIn])
}
