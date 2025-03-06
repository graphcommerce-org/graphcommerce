import { useFormCompose } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { PaymentPlaceOrderProps } from '@graphcommerce/magento-cart-payment-method'
import { useRouter } from 'next/router'
import { useAfterpayCartLock } from '../../hooks/useAfterpayCartLock'
import { AfterpayPaymentPlaceOrderDocument } from './AfterpayPaymentPlaceOrder.gql'

export function AfterpayPaymentPlaceOrder(props: PaymentPlaceOrderProps) {
  const { code, step } = props
  const [, lock] = useAfterpayCartLock()
  const { push } = useRouter()

  const form = useFormGqlMutationCart(AfterpayPaymentPlaceOrderDocument, {
    onBeforeSubmit: (variables) => ({
      ...variables,
      redirect_path: { cancel_path: `checkout/payment`, confirm_path: `checkout/payment` },
    }),
    onComplete: async (result) => {
      if (result.errors) return

      const start = result.data?.createAfterpayCheckout?.afterpay_redirectCheckoutUrl
      const orderToken = result.data?.createAfterpayCheckout?.afterpay_token

      if (!start)
        throw Error(
          'Error while starting the Afterpay payment, please try again with a different payment method',
        )

      await lock({ orderToken, method: code })
      // We are going to redirect, but we're not waiting, because we need to complete the submission to release the buttons
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      push(start)
    },
  })

  const submit = form.handleSubmit(() => {})
  useFormCompose({ form, step, submit, key: `AfterpayPaymentPlaceOrder_${code}` })

  return (
    <form onSubmit={submit} noValidate>
      <input type='hidden' value={code} />
    </form>
  )
}
