import { useMutation, useQuery, useApolloClient } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import {
  AddProductToWishlistDocument,
  GuestWishlistDocument,
} from '@graphcommerce/magento-wishlist'
import { useEffect } from 'react'

/** Merge guest wishlist items to customer session upon login */
export function useMergeGuestWishlistWithCustomer() {
  const { data: token } = useQuery(CustomerTokenDocument)
  const isLoggedIn = token?.customerToken && token?.customerToken.valid
  const { cache } = useApolloClient()

  const { data: guestWishlistData, loading: loadingGuestWishlistData } = useQuery(
    GuestWishlistDocument,
    {
      ssr: false,
    },
  )

  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)

  useEffect(() => {
    if (!isLoggedIn) return

    const wishlist = guestWishlistData?.guestWishlist?.items.map((item) => item?.sku) || []

    if (!wishlist.length) return

    const payload = wishlist.map((item) => ({
      sku: item,
      quantity: 1,
    }))

    cache.evict({
      id: cache.identify({ __typename: 'GuestWishlist' }),
    })
    addWishlistItem({ variables: { input: payload } })
  })
}
