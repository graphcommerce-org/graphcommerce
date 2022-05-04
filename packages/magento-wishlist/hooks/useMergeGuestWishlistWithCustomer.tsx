/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery, useApolloClient } from '@graphcommerce/graphql'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { useEffect } from 'react'
import { AddProductToWishlistDocument } from '../queries/AddProductToWishlist.gql'
import { GetGuestWishlistProductsDocument } from '../queries/GetGuestWishlistProducts.gql'
import { GuestWishlistDocument } from '../queries/GuestWishlist.gql'

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

    if (!guestDataSkus.length) return

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

    addWishlistItem({ variables: { input: payload } }).then(() => 
      cache.evict({
        id: cache.identify({ __typename: 'GuestWishlist' }),
      })
    )
  }, [isLoggedIn])
}
