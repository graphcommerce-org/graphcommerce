import { useCartId } from '@reachdigital/magento-cart/CurrentCartId/useCartId'
import { useFormCompose, useFormGqlMutation } from '@reachdigital/react-hook-form'
import { PaymentOptionsProps } from '../Api/PaymentMethod'
import { PaymentMethodOptionsNoopDocument } from './PaymentMethodOptionsNoop.gql'

function PaymentMethodOptionsNoop(props: PaymentOptionsProps) {
  const { code, step } = props
  const form = useFormGqlMutation(PaymentMethodOptionsNoopDocument)
  const { handleSubmit, register } = form
  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  return (
    <form onSubmit={submit} style={{ visibility: 'hidden' }}>
      <input type='hidden' {...register('cartId')} value={useCartId()} />
      <input type='hidden' {...register('code')} value={code} />
    </form>
  )
}

export default PaymentMethodOptionsNoop
