import { useApolloClient } from '@graphcommerce/graphql'
import { useCustomerSession } from '@graphcommerce/magento-customer'
import {
  AddProductToWishlistDocument,
  AddProductToWishlistMutationVariables,
} from './AddProductToWishlist.gql'
import { UseWishlistGuestDocument } from '../useWishlistitems'
import { WishlistItemFragment } from '../../queries/WishlistItem.gql'
import { useEventCallback } from '@mui/material'

function isMutationVariableInput(
  input: AddProductToWishlistMutationVariables['input'] | WishlistItemFragment[],
): input is AddProductToWishlistMutationVariables['input'] {
  return !('__typename' in input[0])
}

export function useAddProductsToWishlist() {
  const { loggedIn } = useCustomerSession()
  const client = useApolloClient()

  async function add(
    input: AddProductToWishlistMutationVariables['input'] | WishlistItemFragment[],
  ) {
    if (loggedIn) {
      if (!isMutationVariableInput(input))
        throw Error("input must be AddProductToWishlistVariables['input']")
      await client.mutate({
        mutation: AddProductToWishlistDocument,
        variables: { input },
      })
      return
    }

    if (isMutationVariableInput(input)) throw Error('input must be WishlistItemFragment[]')

    const currentItems =
      client.cache.readQuery({ query: UseWishlistGuestDocument })?.customer?.wishlists?.[0]
        ?.items_v2?.items ?? []

    client.cache.writeQuery({
      query: UseWishlistGuestDocument,
      data: {
        customer: {
          __typename: 'Customer',
          wishlists: [
            {
              __typename: 'Wishlist',
              id: 'guest-wishlist',
              items_count: currentItems.length + 1,
              items_v2: {
                __typename: 'WishlistItems',
                items: [...currentItems, ...input],
              },
            },
          ],
        },
      },
      broadcast: true,
    })
  }

  return useEventCallback(add)
}
