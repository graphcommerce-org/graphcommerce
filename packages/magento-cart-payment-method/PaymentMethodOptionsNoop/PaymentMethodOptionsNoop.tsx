import { useCartId } from '@reachdigital/magento-cart/CurrentCartId/useCartId'
import { useFormCompose, useFormGqlMutation } from '@reachdigital/react-hook-form'
import { PaymentOptionsProps } from '../Api/PaymentMethod'
import { PaymentMethodOptionsNoopDocument } from './PaymentMethodOptionsNoop.gql'

function PaymentMethodOptionsNoop(props: PaymentOptionsProps) {
  const { code, step } = props
  const cartId = useCartId()
  const form = useFormGqlMutation(PaymentMethodOptionsNoopDocument, {
    defaultValues: { cartId, code },
  })

  const { handleSubmit, register } = form
  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  return (
    <form onSubmit={submit} style={{ visibility: 'hidden' }}>
      <input type='hidden' {...register('cartId')} />
      <input type='hidden' {...register('code')} />
    </form>
  )
}

export default PaymentMethodOptionsNoop
