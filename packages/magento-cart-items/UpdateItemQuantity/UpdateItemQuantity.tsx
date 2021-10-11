import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { TextInputNumber } from '@graphcommerce/next-ui'
import { useFormAutoSubmit } from '@graphcommerce/react-hook-form'
import React, { useState } from 'react'
import {
  UpdateItemQuantityDocument,
  UpdateItemQuantityMutationVariables,
} from './UpdateItemQuantity.gql'

export type UpdateItemQuantityProps = Omit<UpdateItemQuantityMutationVariables, 'cartId'> & {
  onError?: (err: any) => void
}

export default function UpdateItemQuantity(props: UpdateItemQuantityProps) {
  const { uid, quantity, onError } = props
  const form = useFormGqlMutationCart(UpdateItemQuantityDocument, {
    defaultValues: { uid, quantity },
    mode: 'onChange',
  })
  // const [lastKnownValue, setLastKnownValue] = useState<number>(quantity)

  const { muiRegister, required, handleSubmit, formState, error, reset, getValues } = form

  const submit = handleSubmit(() => {
    // setLastKnownValue(quantity)
  })
  useFormAutoSubmit({ form, submit })

  if (error && onError) {
    reset(getValues())
    onError(error)
  }

  return (
    <form noValidate onSubmit={submit}>
      <TextInputNumber
        size='small'
        variant='outlined'
        inputProps={{ min: 1 }}
        error={!!formState.errors.quantity}
        required={required.quantity}
        {...muiRegister('quantity', { required: required.quantity })}
        helperText={formState.errors.quantity?.message}
      />
    </form>
  )
}
