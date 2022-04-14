/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useApolloClient } from '@graphcommerce/graphql'
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

  const guestData = guestWishlistData?.items.map((item) => item?.sku) || []
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const validatedItems =
    useQuery(GetGuestWishlistProductsDocument, {
      ssr: false,
      variables: {
        filters: { sku: { in: guestData } },
      },
      skip: guestData.length === 0,
    }).data?.products?.items || []

  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)

  useEffect(() => {
    if (!isLoggedIn) return

    if (!validatedItems.length) return

    /** Magento schema defines product sku as optional, wishlist sku as mandatory = type mismatch */
    const wishlist = validatedItems.reduce((result: string[], item) => {
      if (item?.sku !== null && item?.sku !== undefined) {
        result.push(item.sku)
      }
      return result
    }, [])

    if (!wishlist.length) return

    const payload = wishlist.map((item) => ({
      sku: item,
      quantity: 1,
    }))

    cache.evict({
      id: cache.identify({ __typename: 'GuestWishlist' }),
    })
    addWishlistItem({ variables: { input: payload } })
  }, [validatedItems, addWishlistItem, cache, isLoggedIn])
}
