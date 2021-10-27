import { useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { Button, MessageSnackbar, TextInputNumber } from '@graphcommerce/next-ui'
import { useFormAutoSubmit } from '@graphcommerce/react-hook-form'
import React from 'react'
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

  const { muiRegister, required, handleSubmit, formState, error, reset, getValues } = form

  const submit = handleSubmit(() => {})
  useFormAutoSubmit({ form, submit })

  if (error && onError) {
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

      {error && (
        <>
          <MessageSnackbar
            open={!!error}
            variant='pill'
            severity='error'
            onClose={() => reset({ quantity })}
            action={
              <Button size='medium' variant='pill' color='secondary'>
                Ok
              </Button>
            }
          >
            <>{error?.message}</>
          </MessageSnackbar>
        </>
      )}
    </form>
  )
}
