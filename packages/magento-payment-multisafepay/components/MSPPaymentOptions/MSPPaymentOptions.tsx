import { useFormAutoSubmit, useFormCompose } from '@graphcommerce/ecommerce-ui'
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import type { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { MSPPaymentOptionsDocument } from './MSPPaymentOptions.gql'

/** It sets the selected payment method on the cart. */
export function MSPPaymentOptions(props: PaymentOptionsProps) {
  const { code, step } = props

  const form = useFormGqlMutationCart(MSPPaymentOptionsDocument, { mode: 'onChange' })

  const { handleSubmit, register } = form

  const submit = handleSubmit(() => {})
  useFormAutoSubmit({ form, submit, forceInitialSubmit: true })

  const key = `PaymentMethodOptions_${code}`
  useFormCompose({ form, step, submit, key })

  return (
    <form onSubmit={submit} noValidate>
      <input type='hidden' value={code} {...register('paymentMethod.code')} />
    </form>
  )
}
