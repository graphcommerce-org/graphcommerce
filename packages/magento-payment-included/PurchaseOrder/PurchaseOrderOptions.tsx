import { TextField } from '@material-ui/core'
import { useFormGqlMutationCart } from '@reachdigital/magento-cart'
import { PaymentOptionsProps } from '@reachdigital/magento-cart-payment-method'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { useFormCompose, useFormValidFields } from '@reachdigital/react-hook-form'
import React from 'react'
import { PurchaseOrderOptionsDocument } from './PurchaseOrderOptions.gql'

function PurchaseOrderOptions(props: PaymentOptionsProps) {
  const formClasses = useFormStyles()
  const { code, step, selected, Container } = props
  const form = useFormGqlMutationCart(PurchaseOrderOptionsDocument, {
    mode: 'onChange',
    defaultValues: {
      poNumber: selected?.purchase_order_number ?? undefined,
    },
  })
  const { handleSubmit, register, muiRegister, formState, required } = form
  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })
  const valid = useFormValidFields(form, required)

  return (
    <Container>
      <form onSubmit={submit} noValidate>
        <input type='hidden' {...register('code')} value={code} />

        <div className={formClasses.formRow}>
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
        </div>
      </form>
    </Container>
  )
}

export default PurchaseOrderOptions
