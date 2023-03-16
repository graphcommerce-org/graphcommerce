import { useCurrentCartId, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import {
  PaymentPlaceOrderProps,
  usePaymentMethodContext,
} from '@graphcommerce/magento-cart-payment-method'
import { useFormCompose } from '@graphcommerce/react-hook-form'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useCartLockWithToken } from '../../hooks/useCartLockWithToken'
import { MolliePlaceOrderDocument } from './MolliePlaceOrder.gql'

export function MolliePlaceOrder(props: PaymentPlaceOrderProps) {
  const { step, code } = props
  const { push } = useRouter()
  const { currentCartId } = useCurrentCartId()
  const [lockState, lock] = useCartLockWithToken()
  const { selectedMethod } = usePaymentMethodContext()

  const form = useFormGqlMutationCart(MolliePlaceOrderDocument, {
    onBeforeSubmit(variables) {
      const current = new URL(window.location.href.replace(window.location.hash, ''))
      // current.searchParams.append('locked', '1')
      current.searchParams.set('cart_id', currentCartId ?? lockState.cart_id ?? '')
      current.searchParams.set('mollie_payment_token', 'PAYMENT_TOKEN')
      current.searchParams.set('order_number', 'ORDER_NUMBER')
      current.searchParams.set('method', selectedMethod?.code ?? '')
      current.searchParams.set('locked', '1')
      const returnUrl = current
        .toString()
        .replace('PAYMENT_TOKEN', '{{payment_token}}')
        .replace('ORDER_NUMBER', '{{increment_id}}')

      return {
        ...variables,
        returnUrl,
      }
    },
  })

  const { handleSubmit, data, error } = form
  const submit = handleSubmit(() => {})

  useEffect(() => {
    if (!data?.placeOrder?.order || error || !currentCartId) return
    const redirectUrl = data?.placeOrder?.order.mollie_redirect_url
    const mollie_payment_token = data?.placeOrder?.order.mollie_payment_token

    async function redirect() {
      // When redirecting to the payment gateway
      if (redirectUrl && mollie_payment_token) {
        await lock({
          mollie_payment_token,
          method: selectedMethod?.code ?? null,
          order_number: data.placeOrder?.order.order_number,
        })
        await push(redirectUrl)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    redirect()
  }, [currentCartId, data?.placeOrder?.order, error, lock, push, selectedMethod?.code])

  useFormCompose({ form, step, submit, key: `PaymentMethodPlaceOrder_${code}` })

  return <form onSubmit={submit} />
}
