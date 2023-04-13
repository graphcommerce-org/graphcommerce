import { ApolloErrorSnackbar } from '@graphcommerce/ecommerce-ui'
import { useMutation } from '@graphcommerce/graphql'
import { useCurrentCartId } from '@graphcommerce/magento-cart'
import {
  PaymentHandlerProps,
  usePaymentMethodContext,
} from '@graphcommerce/magento-cart-payment-method'
import { useRouter } from 'next/compat/router'
import { useEffect } from 'react'
import { usePayPalCartLock } from '../../hooks/usePayPalCartLock'
import { PayPalPaymentHandlerDocument } from './PayPalPaymentHandler.gql'

export const PayPalPaymentHandler = (props: PaymentHandlerProps) => {
  const { code } = props
  const { push } = useRouter()
  const [lockStatus, , unlock] = usePayPalCartLock()
  const { onSuccess } = usePaymentMethodContext()
  const { currentCartId: cartId } = useCurrentCartId()

  const { token, PayerID, locked, justLocked, method } = lockStatus
  const [placeOrder, { error, called }] = useMutation(PayPalPaymentHandlerDocument, {
    variables: {
      cartId,
      paymentMethod: {
        code,
        paypal_express: {
          payer_id: PayerID ?? '',
          token: token ?? '',
        },
      },
    },
    errorPolicy: 'all',
  })

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (locked && !justLocked && method === code && !PayerID) unlock({ token: null, PayerID: null })
  }, [PayerID, code, justLocked, locked, method, unlock])

  // If successfull we clear it's cart and redirect to the success page.
  useEffect(() => {
    if (!token || !PayerID || called) return
    if (!cartId) return

    const fetchData = async () => {
      const res = await placeOrder()

      if (res.errors || !res.data?.placeOrder?.order) {
        await unlock({ token: null, PayerID: null })
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      onSuccess(res.data?.placeOrder?.order.order_number)
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData()
  }, [PayerID, called, cartId, onSuccess, placeOrder, push, token, unlock])

  if (error) return <ApolloErrorSnackbar error={error} />
  return null
}
