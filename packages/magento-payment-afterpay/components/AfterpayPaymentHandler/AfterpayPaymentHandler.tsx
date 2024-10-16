import { ApolloErrorSnackbar } from '@graphcommerce/ecommerce-ui'
import { useMutation } from '@graphcommerce/graphql'
import { useCurrentCartId } from '@graphcommerce/magento-cart'
import {
  PaymentHandlerProps,
  usePaymentMethodContext,
} from '@graphcommerce/magento-cart-payment-method'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useAfterpayCartLock } from '../../hooks/useAfterpayCartLock'
import { AfterpayPaymentHandlerDocument } from './AfterpayPaymentHandler.gql'

export const AfterpayPaymentHandler = (props: PaymentHandlerProps) => {
  const { code } = props
  const { push } = useRouter()
  const [lockStatus, , unlock] = useAfterpayCartLock()
  const { onSuccess } = usePaymentMethodContext()
  const { currentCartId: cartId } = useCurrentCartId()

  const { orderToken, status, locked, justLocked, method } = lockStatus
  const [placeOrder, { error, called }] = useMutation(AfterpayPaymentHandlerDocument, {
    variables: {
      cartId,
      paymentMethod: {
        code,
        afterpay: {
          afterpay_token: orderToken ?? '',
        },
      },
    },
    errorPolicy: 'all',
  })

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    if (locked && !justLocked && status === 'CANCELLED') unlock({ orderToken: null, status: null })
  }, [status, code, justLocked, locked, method, unlock])

  // If successfull we clear it's cart and redirect to the success page.
  useEffect(() => {
    if (!orderToken || status !== 'SUCCESS' || called) return
    if (!cartId) return

    const fetchData = async () => {
      const res = await placeOrder()

      if (res.errors || !res.data?.placeOrder?.order) {
        await unlock({ orderToken: null, status: null })
        return
      }

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      onSuccess(res.data?.placeOrder?.order.order_number)
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData()
  }, [status, called, cartId, onSuccess, placeOrder, push, orderToken, unlock])

  if (error) return <ApolloErrorSnackbar error={error} />
  return null
}
