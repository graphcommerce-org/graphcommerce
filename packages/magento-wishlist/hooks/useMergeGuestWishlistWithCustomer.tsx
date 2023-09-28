import { useMutation, useApolloClient } from '@graphcommerce/graphql'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { nonNullable } from '@graphcommerce/next-ui'
import { useEffect } from 'react'
import { AddProductToWishlistDocument } from '../queries/AddProductToWishlist.gql'
import { useWishlistItems } from './useWishlistItems'

/** Merge guest wishlist items to customer session upon login */
export function useMergeGuestWishlistWithCustomer() {
  const { loggedIn } = useCustomerSession()
  const { cache } = useApolloClient()

  const wishlist = useWishlistItems()

  const [addWishlistItem] = useMutation(AddProductToWishlistDocument)

  useEffect(() => {
    if (!loggedIn || !wishlist.data || wishlist.data.length === 0) return

    const clearGuestList = () =>
      cache.evict({ id: cache.identify({ __typename: 'GuestWishlist' }) })

    if (wishlist.data?.length === 0) {
      clearGuestList()
    } else {
      const input = wishlist.data.map((item) => ({
        sku: item?.product?.sku || '',
        selected_options:
          (item?.__typename === 'ConfigurableWishlistItem' &&
            item?.configurable_options
              ?.filter(nonNullable)
              .map((option) => option?.configurable_product_option_value_uid)) ||
          [],
        quantity: 1,
      }))

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      if (input.length) addWishlistItem({ variables: { input } }).then(clearGuestList)
    }
  }, [addWishlistItem, cache, loggedIn, wishlist.data])
}
