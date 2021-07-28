import { useFormGqlMutationCart } from '@reachdigital/magento-cart'
import { useFormCompose } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import { PaymentPlaceOrderProps } from '../Api/PaymentMethod'
import { PaymentMethodPlaceOrderNoopDocument } from './PaymentMethodPlaceOrderNoop.gql'

export default function PaymentMethodPlaceOrderNoop(props: PaymentPlaceOrderProps) {
  const { step, paymentDone, code } = props

  const form = useFormGqlMutationCart(PaymentMethodPlaceOrderNoopDocument, {
    mode: 'onChange',
  })

  const { handleSubmit } = form
  const router = useRouter()

  const submit = handleSubmit(({ cartId }) => {
    console.log('payment is done')
    // paymentDone()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    // router.push({ pathname: '/checkout/success', query: { cartId } })
  })

  useFormCompose({ form, step, submit, key: `PaymentMethodPlaceOrder_${code}` })

  return <form onSubmit={submit} />
}
