import { ApolloErrorSnackbar } from '@graphcommerce/ecommerce-ui'
import { useMutation } from '@graphcommerce/graphql'
import {
  useAssignCurrentCartId,
  useClearCurrentCartId,
  useCurrentCartId,
} from '@graphcommerce/magento-cart'
import { PaymentHandlerProps } from '@graphcommerce/magento-cart-payment-method'
import { ErrorSnackbar } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { FormControlLabel } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { usePayPalCartLock } from '../../hooks/usePayPalCartLock'
import { PayPalPaymentHandlerDocument } from './PayPalPaymentHandler.gql'

export const PayPalPaymentHandler = (props: PaymentHandlerProps) => {
  const { code } = props
  const { push } = useRouter()
  const [lockStatus, , unlock] = usePayPalCartLock()
  const clearCurrentCartId = useClearCurrentCartId()
  const { currentCartId: cartId } = useCurrentCartId()

  const { token, PayerID } = lockStatus
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

  // If successfull we clear it's cart and redirect to the success page.
  useEffect(() => {
    if (!token || !PayerID || called) return
    if (!cartId) return

    const fetchData = async () => {
      const res = await placeOrder()

      if (res.errors) {
        await unlock({ token: null, PayerID: null })
        return
      }

      // We're done with the current cart, we clear the current cartId.
      clearCurrentCartId()

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      push({
        pathname: '/checkout/success',
        query: {
          cart_id: cartId,
          order_number: res.data?.placeOrder?.order.order_number,
        },
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchData()
  }, [PayerID, called, cartId, clearCurrentCartId, placeOrder, push, token, unlock])

  if (error) return <ApolloErrorSnackbar error={error} />
  return null
}
