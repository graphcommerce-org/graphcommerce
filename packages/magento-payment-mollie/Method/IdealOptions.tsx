import { useApolloClient } from '@apollo/client'
import { TextField } from '@material-ui/core'
import {
  PaymentMethodOptionsNoop,
  PaymentOptionsProps,
} from '@reachdigital/magento-cart-payment-method'
import {
  PaymentMethodOptionsNoopDocument,
  PaymentMethodOptionsNoopMutation,
  PaymentMethodOptionsNoopMutationVariables,
} from '@reachdigital/magento-cart-payment-method/PaymentMethodOptionsNoop/PaymentMethodOptionsNoop.gql'
import { useCartId } from '@reachdigital/magento-cart/CurrentCartId/useCartId'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import {
  useFormCompose,
  useFormGqlMutation,
  useFormPersist,
  useFormValidFields,
} from '@reachdigital/react-hook-form'
import React from 'react'

export const selectedOption: { issuer?: string } = {
  issuer: undefined,
}

export default function MollieIdealOptions(props: PaymentOptionsProps) {
  const { mollie_available_issuers = [] } = props
  const { code, step, Container } = props
  const formClasses = useFormStyles()
  const cartId = useCartId()

  const form = useFormGqlMutation<
    PaymentMethodOptionsNoopMutation,
    PaymentMethodOptionsNoopMutationVariables & { issuer?: string }
  >(PaymentMethodOptionsNoopDocument, {
    mode: 'onChange',
    defaultValues: { cartId, code },
  })

  const { handleSubmit, watch, muiRegister, formState, required } = form
  const submit = handleSubmit(() => {})

  useFormPersist({ form, name: `PaymentMethodOptions_${code}` })
  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })
  const valid = useFormValidFields(form, required)
  selectedOption.issuer = watch('issuer')

  return (
    <>
      <Container>
        <form onSubmit={submit} noValidate>
          <div className={formClasses.formRow}>
            <TextField
              variant='outlined'
              select
              SelectProps={{ native: true }}
              error={formState.isSubmitted && !!formState.errors.issuer}
              helperText={formState.isSubmitted && formState.errors.issuer?.message}
              label='Bank'
              required
              {...muiRegister('issuer', { required: true, minLength: 2 })}
              InputProps={{
                endAdornment: <InputCheckmark show={valid.issuer} />,
              }}
            >
              <option value='' />
              {mollie_available_issuers?.map((issuer) => {
                if (!issuer?.code || !issuer.name) return null
                return (
                  <option key={issuer.code} value={issuer.code}>
                    {issuer.name}
                  </option>
                )
              })}
            </TextField>
          </div>
        </form>
      </Container>
    </>
  )
}
