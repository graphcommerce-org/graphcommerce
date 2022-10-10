import { useFormCompose } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { useRouter } from 'next/router'
import { usePayPalCartLock } from '../../hooks/usePayPalCartLock'
import { PayPalPaymentOptionsDocument } from './PayPalPaymentOptions.gql'

/** It sets the selected payment method on the cart. */
export function PayPalPaymentOptions(props: PaymentOptionsProps) {
  const { code, step } = props
  const [, lock] = usePayPalCartLock()
  const { push } = useRouter()

  const form = useFormGqlMutationCart(PayPalPaymentOptionsDocument, {
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

      await lock({ token, method: code })
      // We are going to redirect, but we're not waiting, because we need to complete the submission to release the buttons
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      push(start)
    },
  })

  const submit = form.handleSubmit(() => {})
  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  return (
    <form onSubmit={submit} noValidate>
      <input type='hidden' value={code} {...form.register('code')} />
    </form>
  )
}
