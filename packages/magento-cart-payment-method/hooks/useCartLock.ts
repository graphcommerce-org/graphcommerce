import { useApolloClient } from '@apollo/client'
import { useCartQuery, useCurrentCartId } from '@graphcommerce/magento-cart'
import { useCallback } from 'react'
import { UseCartLockDocument } from './UseCartLock.gql'

/**
 * Locking a cart might is usefull in the following cases: We want to disable cart modifications
 * while still keeping the cart active on the website.
 *
 * Todo: Block all operations on the cart while the cart is being blocked.
 */
export function useCartLock() {
  const { cache } = useApolloClient()
  const cartId = useCurrentCartId()

  const locked = useCartQuery(UseCartLockDocument, { allowUrl: true }).data?.cart?.locked ?? false

  const lock = useCallback(
    (locking: boolean) => {
      if (!cartId) return

      cache.writeQuery({
        query: UseCartLockDocument,
        data: { cart: { __typename: 'Cart', id: cartId, locked: locking } },
        variables: { cartId },
        broadcast: true,
      })
    },
    [cache, cartId],
  )

  return { locked, lock }
}
