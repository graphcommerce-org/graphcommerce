import { useApolloClient, useMutation } from '@graphcommerce/graphql'
import { useCartQuery } from '@graphcommerce/magento-cart'
import { BillingPageDocument } from '@graphcommerce/magento-cart-checkout'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { useEffect } from 'react'
import { useCartLockWithToken } from './useCartLockWithToken'
import { ReviveCartDocument } from '../graphql/ReviveCart.gql'

export function useMollieReviveCart() {
  const [{ cart_id, method, customer_token }] = useCartLockWithToken()
  const billingPage = useCartQuery(BillingPageDocument, { fetchPolicy: 'cache-only' })
  const client = useApolloClient()
  const [revive, result] = useMutation(ReviveCartDocument)

  const reviveNow = cart_id && !billingPage.data?.cart?.id && method?.startsWith('mollie_')

  useEffect(() => {
    if (!reviveNow) return // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      // In GraphCommerce 8 the user would automatically be presented with a restore session dialog
      if (customer_token) {
        client.cache.writeQuery({
          query: CustomerTokenDocument,
          broadcast: true,
          data: {
            customerToken: {
              __typename: 'CustomerToken',
              token: customer_token,
              createdAt: new Date().toUTCString(),
              valid: true,
            },
          },
        })
      } else {
        client.cache.evict({ fieldName: 'customerToken' })
      }

      const cart = (await revive({ variables: { cartId: cart_id } })).data?.mollieRestoreCart?.cart

      if (!cart) {
        console.log('Could not revive cart')
        return
      }
      client.cache.writeQuery({
        query: BillingPageDocument,
        variables: { cartId: cart_id },
        data: { cart },
        broadcast: true,
      })
    })()
  }, [cart_id, client.cache, customer_token, revive, reviveNow])

  if (billingPage.data) return !billingPage.loading
  return !result.loading
}
