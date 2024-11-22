import { useApolloClient } from '@graphcommerce/graphql'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import { filterNonNullableKeys } from '@graphcommerce/next-ui'
import { useEventCallback } from '@mui/material'
import { UseWishlistGuestDocument } from '../useWishlistitems'
import type { UseRemoveProductsFromWishlistMutationVariables } from './UseRemoveProductsFromWishlist.gql'
import { UseRemoveProductsFromWishlistDocument } from './UseRemoveProductsFromWishlist.gql'

export function useRemoveProductsFromWishlist() {
  const client = useApolloClient()
  const { loggedIn } = useCustomerSession()

  const remove = async (
    wishlistItemIds: UseRemoveProductsFromWishlistMutationVariables['wishlistItemIds'],
  ) => {
    if (loggedIn) {
      await client.mutate({
        mutation: UseRemoveProductsFromWishlistDocument,
        variables: { wishlistItemIds },
      })
      return
    }

    const currentItems = client.cache.readQuery({ query: UseWishlistGuestDocument })?.customer
      ?.wishlists?.[0]?.items_v2?.items

    const items = filterNonNullableKeys(currentItems)?.filter(
      (currentItem) => !wishlistItemIds.includes(currentItem.id),
    )

    client.cache.writeQuery({
      query: UseWishlistGuestDocument,
      broadcast: true,
      data: {
        customer: {
          __typename: 'Customer',
          wishlists: [
            {
              __typename: 'Wishlist',
              id: 'guest-wishlist',
              items_count: items?.length,
              items_v2: { __typename: 'WishlistItems', items },
            },
          ],
        },
      },
    })
  }

  return useEventCallback(remove)
}
