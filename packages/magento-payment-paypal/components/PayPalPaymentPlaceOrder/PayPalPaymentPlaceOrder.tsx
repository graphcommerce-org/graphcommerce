import { useFormCompose } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { PaymentPlaceOrderProps } from '@graphcommerce/magento-cart-payment-method'
import { useRouter } from 'next/compat/router'
import { usePayPalCartLock } from '../../hooks/usePayPalCartLock'
import { PayPalPaymentPlaceOrderDocument } from './PayPalPaymentPlaceOrder.gql'

export function PayPalPaymentPlaceOrder(props: PaymentPlaceOrderProps) {
  const { code, step } = props
  const [, lock] = usePayPalCartLock()
  const { push } = useRouter()

  const form = useFormGqlMutationCart(PayPalPaymentPlaceOrderDocument, {
    onBeforeSubmit: (variables) => ({
      ...variables,
      code,
      urls: { cancel_url: `checkout/payment`, return_url: `checkout/payment` },
    }),
    onComplete: async (result) => {
      if (result.errors) return

      const start = result.data?.createPaypalExpressToken?.paypal_urls?.start
      const token = result.data?.createPaypalExpressToken?.token

      if (!start)
        throw Error(
          'Error while starting the PayPal payment, please try again with a different payment method',
        )

      await lock({ token, method: code, PayerID: null })
      // We are going to redirect, but we're not waiting, because we need to complete the submission to release the buttons
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      push(start)
    },
  })

  const submit = form.handleSubmit(() => {})
  useFormCompose({ form, step, submit, key: `PayPalPaymentPlaceOrder_${code}` })

  return (
    <form onSubmit={submit} noValidate>
      <input type='hidden' value={code} {...form.register('code')} />
    </form>
  )
}
