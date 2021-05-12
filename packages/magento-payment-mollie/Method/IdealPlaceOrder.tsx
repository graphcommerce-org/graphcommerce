import { useApolloClient } from '@apollo/client'
import { useFormGqlMutationCart } from '@reachdigital/magento-cart'
import { PaymentPlaceOrderProps } from '@reachdigital/magento-cart-payment-method'
import { useFormCompose } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import { CreateIdealTransactionDocument } from './CreateIdealTransaction.gql'
import { selectedOption } from './IdealOptions'
import { PlaceMollieOrderDocument } from './PlaceMollieOrder.gql'

export default function IdealPlaceOrder(props: PaymentPlaceOrderProps) {
  const { step, paymentDone, code } = props
  const router = useRouter()

  const client = useApolloClient()
  const form = useFormGqlMutationCart(PlaceMollieOrderDocument, {
    mode: 'onChange',
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

  const { handleSubmit } = form

  const submit = handleSubmit(() => paymentDone())

  useFormCompose({ form, step, submit, key: `PaymentMethodPlaceOrder_${code}` })

  return <form onSubmit={submit} />
}
