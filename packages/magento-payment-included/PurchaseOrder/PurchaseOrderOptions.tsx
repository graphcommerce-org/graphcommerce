import { TextField } from '@material-ui/core'
import { PaymentOptionsProps } from '@reachdigital/magento-cart-payment-method'
import { useCartId } from '@reachdigital/magento-cart/CurrentCartId/useCartId'
import InputCheckmark from '@reachdigital/next-ui/Form/InputCheckmark'
import {
  useFormCompose,
  useFormGqlMutation,
  useFormValidFields,
} from '@reachdigital/react-hook-form'
import React from 'react'
import { PurchaseOrderOptionsDocument } from './PurchaseOrderOptions.gql'

function PurchaseOrderOptions(props: PaymentOptionsProps) {
  const { code, step, selected, Container: Render } = props
  const form = useFormGqlMutation(PurchaseOrderOptionsDocument, {
    defaultValues: {
      poNumber: selected?.purchase_order_number ?? undefined,
    },
  })
  const { handleSubmit, register, muiRegister, formState, required } = form
  const submit = handleSubmit(() => {})

  useFormCompose({ form, step, submit, key: `PaymentMethodOptions_${code}` })
  const valid = useFormValidFields(form, required)

  return (
    <Render>
      <form onSubmit={submit}>
        <input type='hidden' {...register('cartId')} value={useCartId()} />
        <input type='hidden' {...register('code')} value={code} />

        <TextField
          variant='outlined'
          type='text'
          error={formState.isSubmitted && !!formState.errors.poNumber}
          helperText={formState.isSubmitted && formState.errors.poNumber?.message}
          label='Purchase Order Nr.'
          required={required.poNumber}
          {...muiRegister('poNumber', { required: required.poNumber })}
          InputProps={{ endAdornment: <InputCheckmark show={valid.poNumber} /> }}
        />
      </form>
    </Render>
  )
}

export default PurchaseOrderOptions
