import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { useFormCompose } from '@graphcommerce/react-hook-form'
import { BraintreeError } from 'braintree-web'
import { BraintreePaymentMethodOptionsDocument } from '../../BraintreePaymentMethodOptions.graphql'
import { useBraintreeHostedFields } from '../../hooks/useBraintreeHostedFields'

const errorTypes = ['CUSTOMER', 'MERCHANT', 'NETWORK', 'INTERNAL', 'UNKNOWN']

function isBraintreeError(e: any | BraintreeError): e is BraintreeError {
  return errorTypes.includes((e as BraintreeError).type)
}

/** It sets the selected payment method on the cart. */
function PaymentMethodOptions(props: PaymentOptionsProps) {
  const { code, step, Container } = props
  const hosted = useBraintreeHostedFields()

  /**
   * In the this folder you'll also find a PaymentMethodOptionsNoop.graphql document that is
   * imported here and used as the basis for the form below.
   */
  const form = useFormGqlMutationCart(BraintreePaymentMethodOptionsDocument, {
    defaultValues: { code },
    onBeforeSubmit: async (variables) => {
      try {
        const bla = await hosted
        const { nonce } = await bla.tokenize()
        return {
          ...variables,
          deviceData: '',
          nonce,
          isTokenEnabler: false,
        }
      } catch (e) {
        console.error(e)
        throw e
      }
    },
  })

  const { handleSubmit, register } = form
  const submit = handleSubmit(() => {})

  /** To use an external Pay button we register the current form to be handled there as well. */
  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })

  /** This is the form that the user can fill in. In this case we don't wat the user to fill in anything. */
  return (
    <Container>
      <form onSubmit={submit}>
        <input type='hidden' {...register('code')} />
        <label htmlFor='card-number'>Card Number</label>
        <div id='card-number' />

        <label htmlFor='cvv'>CVV</label>
        <div id='cvv' />

        <label htmlFor='expiration-date'>Expiration Date</label>
        <div id='expiration-date' />
      </form>
    </Container>
  )
}

export default PaymentMethodOptions
