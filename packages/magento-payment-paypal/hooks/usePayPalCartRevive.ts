import { useApolloClient, useMutation } from '@graphcommerce/graphql'
import { useCartQuery } from '@graphcommerce/magento-cart'
import { BillingPageDocument } from '@graphcommerce/magento-cart-checkout'
import { CustomerTokenDocument } from '@graphcommerce/magento-customer'
import { useEffect } from 'react'
import { PayPalPaymentHandlerDocument } from '../components/PayPalPaymentHandler/PayPalPaymentHandler.gql'
import { usePayPalCartLock } from './usePayPalCartLock'
import { UsePayPalCartReviveDocument } from '../graphql/UsePayPalCartRevive.gql'

type UsePayPalCartReviveProps = {
  code: string | null
}

export function usePayPalCartRevive(props: UsePayPalCartReviveProps) {
  const { code } = props
  const [lockStatus] = usePayPalCartLock()

  const { token, PayerID, customerToken, method, cart_id: cartId } = lockStatus
  const [placeOrder, result] = useMutation(UsePayPalCartReviveDocument)

  const billingPage = useCartQuery(BillingPageDocument, { fetchPolicy: 'cache-only' })
  const client = useApolloClient()

  const reviveNow =
    cartId &&
    !billingPage.data?.cart?.id &&
    method?.startsWith('paypal_') &&
    PayerID &&
    token &&
    code

  useEffect(() => {
    if (!reviveNow) return // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      // In GraphCommerce 8 the user would automatically be presented with a restore session dialog
      if (customerToken) {
        client.cache.writeQuery({
          query: CustomerTokenDocument,
          broadcast: true,
          data: {
            customerToken: {
              __typename: 'CustomerToken',
              token: customerToken,
              createdAt: new Date().toUTCString(),
              valid: true,
            },
          },
        })
      } else {
        client.cache.evict({ fieldName: 'customerToken' })
      }

      const cart = (
        await placeOrder({
          variables: {
            cartId,
            paymentMethod: { code, paypal_express: { token, payer_id: PayerID } },
          },
        })
      ).data?.setPaymentMethodOnCart?.cart

      if (!cart) {
        console.log('Could not revive cart')
        return
      }
      client.cache.writeQuery({
        query: BillingPageDocument,
        variables: { cartId },
        data: { cart },
        broadcast: true,
      })
    })()
  }, [PayerID, cartId, client.cache, code, customerToken, placeOrder, reviveNow, token])

  if (billingPage.data) return !billingPage.loading
  return !result.loading
}
