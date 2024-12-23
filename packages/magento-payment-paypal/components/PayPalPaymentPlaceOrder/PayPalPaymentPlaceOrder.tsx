import { useFormCompose } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import {
  assertOrderPlaced,
  type PaymentPlaceOrderProps,
} from '@graphcommerce/magento-cart-payment-method'
import { ApolloError } from '@apollo/client'
import { GraphQLError } from 'graphql'
import { useRouter } from 'next/router'
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
      urls: { cancel_url: 'checkout/payment', return_url: 'checkout/payment' },
    }),
    onComplete: async (result) => {
      if (result.errors && result.errors.length > 0) return

      const start = result.data?.createPaypalExpressToken?.paypal_urls?.start
      const token = result.data?.createPaypalExpressToken?.token

      if (!start) {
        const message =
          'Error while starting the PayPal payment, please try again with a different payment method'
        throw new ApolloError({ graphQLErrors: [{ message }] })
      }

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
