import { useCartQuery, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { useFormAutoSubmit, useFormCompose } from '@graphcommerce/react-hook-form'
import { PaymentOptionsProps } from '../Api/PaymentMethod'
import { GetPaymentMethodContextDocument } from '../PaymentMethodContext/GetPaymentMethodContext.gql'
import { PaymentMethodOptionsNoopDocument } from './PaymentMethodOptionsNoop.gql'

/** It sets the selected payment method on the cart. */
export function PaymentMethodOptionsNoop(props: PaymentOptionsProps) {
  const { code, step } = props

  const context = useCartQuery(GetPaymentMethodContextDocument)

  /**
   * In the this folder you'll also find a PaymentMethodOptionsNoop.graphql document that is
   * imported here and used as the basis for the form below.
   */
  const form = useFormGqlMutationCart(PaymentMethodOptionsNoopDocument, {
    onBeforeSubmit(variables) {
      if (variables.code === context.data?.cart?.selected_payment_method?.code) return false
      return variables
    },
    mode: 'onChange',
    defaultValues: { code },
  })

  const { handleSubmit, register } = form
  const submit = handleSubmit(() => {})

  useFormAutoSubmit({ form, submit, forceInitialSubmit: true })

  /** To use an external Pay button we register the current form to be handled there as well. */
  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  /**
   * This is the form that the user can fill in. In this case we don't wat the user to fill in
   * anything.
   */
  return (
    <form onSubmit={submit} style={{ visibility: 'hidden' }}>
      <input type='hidden' {...register('code')} />
    </form>
  )
}
