/* eslint-disable jsx-a11y/label-has-associated-control */
import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { PaymentOptionsProps } from '@graphcommerce/magento-cart-payment-method'
import { FormLayout, UseFormLayoutProps } from '@graphcommerce/next-ui'
import { UseFormGqlMutationReturn, useFormCompose } from '@graphcommerce/react-hook-form'
import {
  BraintreePaymentMethodOptionsDocument,
  BraintreePaymentMethodOptionsMutation,
} from '../../BraintreePaymentMethodOptions.gql'
import { useBraintreeHostedFields } from '../../hooks/useBraintreeHostedFields'

/** It sets the selected payment method on the cart. */
export function PaymentMethodOptions(
  props: PaymentOptionsProps &
    UseFormLayoutProps<
      UseFormGqlMutationReturn<
        BraintreePaymentMethodOptionsMutation,
        {
          [index: string]: unknown
          cartId: string
        }
      >
    >,
) {
  const { code, step, Container, children } = props
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

  /**
   * This is the form that the user can fill in. In this case we don't wat the user to fill in
   * anything.
   */
  return (
    <Container>
      <form onSubmit={submit}>
        ,
        <FormLayout
          form={form}
          original={
            <>
              <input type='hidden' {...register('code')} />
              <label htmlFor='card-number'>Card Number</label>
              <div id='card-number' />

              <label htmlFor='cvv'>CVV</label>
              <div id='cvv' />

              <label htmlFor='expiration-date'>Expiration Date</label>
              <div id='expiration-date' />
            </>
          }
        >
          {children}
        </FormLayout>
      </form>
    </Container>
  )
}
