import { useApolloClient } from '@apollo/client'
import { PaymentPlaceOrderProps } from '@reachdigital/magento-cart-payment-method'
import { useCartId } from '@reachdigital/magento-cart/CurrentCartId/useCartId'
import { useFormGqlMutation, useFormCompose } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import { CreateIdealTransactionDocument } from './CreateIdealTransaction.gql'
import { selectedOption } from './IdealOptions'
import { PlaceMollieOrderDocument } from './PlaceMollieOrder.gql'

export default function IdealPlaceOrder(props: PaymentPlaceOrderProps) {
  const { step, paymentDone, code } = props
  const router = useRouter()

  const client = useApolloClient()
  const form = useFormGqlMutation(PlaceMollieOrderDocument, {
    mode: 'onChange',
    defaultValues: { cartId: useCartId() },
    onBeforeSubmit: (vars) => {
      if (!selectedOption.issuer) return { cartId: '' }
      return vars
    },
    onComplete: async ({ data }) => {
      const paymentToken = data?.placeOrder?.order.mollie_payment_token

      const res = await client.mutate({
        mutation: CreateIdealTransactionDocument,
        variables: { issuer: selectedOption.issuer ?? '', paymentToken },
      })

      paymentDone()

      setTimeout(() => {
        if (res.data?.createMollieTransaction?.checkout_url) {
          // eslint-disable-next-line @typescript-eslint/no-floating-promises
          router.push(res.data.createMollieTransaction.checkout_url)
        }
      }, 100)
    },
  })

  const { handleSubmit, register } = form

  const submit = handleSubmit(() => paymentDone())

  useFormCompose({ form, step, submit, key: `PaymentMethodPlaceOrder_${code}` })

  return (
    <form onSubmit={submit}>
      <input type='hidden' {...register('cartId')} />
    </form>
  )
}
