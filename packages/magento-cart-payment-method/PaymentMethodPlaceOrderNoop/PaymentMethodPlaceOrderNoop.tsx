import { useCartId } from '@reachdigital/magento-cart/CurrentCartId/useCartId'
import { useFormGqlMutation, useFormCompose } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import { PaymentPlaceOrderProps } from '../Api/PaymentMethod'
import { PaymentMethodPlaceOrderNoopDocument } from './PaymentMethodPlaceOrderNoop.gql'

export default function PaymentMethodPlaceOrderNoop(props: PaymentPlaceOrderProps) {
  const { step, paymentDone } = props
  const form = useFormGqlMutation(PaymentMethodPlaceOrderNoopDocument)
  const { handleSubmit, register } = form
  const router = useRouter()

  const submit = handleSubmit(({ cartId }) => {
    paymentDone()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push({ pathname: '/checkout/success', query: { cartId } })
  })

  useFormCompose({ form, step, submit })

  return (
    <form onSubmit={submit}>
      <input type='hidden' {...register('cartId')} value={useCartId()} />
    </form>
  )
}
