import { useApolloClient, useMutation } from '@graphcommerce/graphql'
import { useAssignCurrentCartId, useCartQuery, useCurrentCartId } from '@graphcommerce/magento-cart'
import { BillingPageDocument } from '@graphcommerce/magento-cart-checkout'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { useEffect } from 'react'
import { MSPPaymentHandlerDocument } from '../components/MSPPaymentHandler/MSPPaymentHandler.gql'
import { useMSPCartLock } from './useMSPCartLock'

export function useMSPReviveCart() {
  const [{ cart_id, method, customer_token }, , unlock] = useMSPCartLock()
  const billingPage = useCartQuery(BillingPageDocument, { fetchPolicy: 'cache-only' })
  const client = useApolloClient()
  const { currentCartId } = useCurrentCartId()
  const assignCurrentCartId = useAssignCurrentCartId()
  const [restore, { error, loading }] = useMutation(MSPPaymentHandlerDocument)

  const reviveNow =
    cart_id &&
    !billingPage.data?.cart?.id &&
    method?.startsWith('multisafepay_') &&
    currentCartId !== cart_id

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

      const restoredId = (await restore({ variables: { cartId: cart_id } })).data?.getPaymentMeta

      if (restoredId) assignCurrentCartId(restoredId)

      await unlock({ customer_token: null, order_number: null, success: null })
    })()
  }, [
    assignCurrentCartId,
    billingPage,
    cart_id,
    client.cache,
    currentCartId,
    customer_token,
    error,
    restore,
    reviveNow,
    unlock,
  ])

  if (billingPage.data) return !billingPage.loading
  return !loading
}
