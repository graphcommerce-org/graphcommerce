import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { PaymentPlaceOrderProps } from '@graphcommerce/magento-cart-payment-method'
import { useFormCompose } from '@graphcommerce/react-hook-form'
import { useRouter } from 'next/router'
import { useCartLockWithToken } from '../../hooks/useCartLockWithToken'
import { MolliePlaceOrderDocument } from './MolliePlaceOrder.gql'

export function MolliePlaceOrder(props: PaymentPlaceOrderProps) {
  const { step, code } = props
  const { push } = useRouter()
  const [, lock] = useCartLockWithToken()

  const form = useFormGqlMutationCart(MolliePlaceOrderDocument, {
    onBeforeSubmit(variables) {
      const current = new URL(window.location.href.replace(window.location.hash, ''))

      current.searchParams.set('cart_id', variables.cartId)
      current.searchParams.set('mollie_payment_token', 'PAYMENT_TOKEN')
      current.searchParams.set('order_number', 'ORDER_NUMBER')
      current.searchParams.set('method', code)
      current.searchParams.set('locked', '1')
      const returnUrl = current
        .toString()
        .replace('PAYMENT_TOKEN', '{{payment_token}}')
        .replace('ORDER_NUMBER', '{{increment_id}}')

      return { ...variables, returnUrl }
    },
    onComplete: async ({ data, errors }) => {
      if (!data?.placeOrder?.order || errors) return

      const { mollie_redirect_url, mollie_payment_token, order_number } = data.placeOrder.order

      // When redirecting to the payment gateway
      if (mollie_redirect_url && mollie_payment_token) {
        await lock({ mollie_payment_token, method: code, order_number })

        await push(mollie_redirect_url)
      } else {
        console.error(`incomplete mollie response, cannot redirect`, data.placeOrder)

        form.setError('root', {
          message:
            'An error occurred while processing your payment. Please contact the store owner',
        })
      }
    },
  })

  const submit = form.handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: `PaymentMethodPlaceOrder_${code}` })

  return <form onSubmit={submit} />
}
