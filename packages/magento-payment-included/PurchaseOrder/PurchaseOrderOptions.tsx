import { TextField, Typography } from '@material-ui/core'
import { useFormGqlMutationCart } from '@reachdigital/magento-cart'
import { PaymentOptionsProps } from '@reachdigital/magento-cart-payment-method'
import { FormRow, InputCheckmark } from '@reachdigital/next-ui'
import { useFormCompose, useFormValidFields } from '@reachdigital/react-hook-form'
import React from 'react'
import { PurchaseOrderOptionsDocument } from './PurchaseOrderOptions.gql'

function PurchaseOrderOptions(props: PaymentOptionsProps) {
  const { code, step, selected, Container, title } = props
  const poNumber = selected?.purchase_order_number ?? undefined

  const form = useFormGqlMutationCart(PurchaseOrderOptionsDocument, {
    mode: 'onChange',
    defaultValues: { code, poNumber },
  })
  const { handleSubmit, muiRegister, formState, required } = form
  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })
  const valid = useFormValidFields(form, required)

  return (
    <Container>
      <Typography variant='h5' component='span'>
        Pay with {title}
      </Typography>
      <form onSubmit={submit} noValidate>
        <FormRow>
          <TextField
            variant='outlined'
            type='text'
            error={formState.isSubmitted && !!formState.errors.poNumber}
            helperText={formState.isSubmitted && formState.errors.poNumber?.message}
            label='Purchase Order Nr.'
            required={required.poNumber}
            {...muiRegister('poNumber', { required: required.poNumber, minLength: 2 })}
            InputProps={{
              endAdornment: <InputCheckmark show={valid.poNumber} />,
            }}
          />
        </FormRow>
      </form>
    </Container>
  )
}

export default PurchaseOrderOptions
