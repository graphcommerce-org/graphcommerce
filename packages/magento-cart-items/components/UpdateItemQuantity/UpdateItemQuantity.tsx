import { ApolloCartErrorSnackbar, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { TextInputNumber, TextInputNumberProps } from '@graphcommerce/next-ui'
import { useFormAutoSubmit, UseFormGraphQlOptions } from '@graphcommerce/react-hook-form'
import { SxProps, Theme } from '@mui/material'
import React from 'react'
import {
  UpdateItemQuantityDocument,
  UpdateItemQuantityMutation,
  UpdateItemQuantityMutationVariables,
} from './UpdateItemQuantity.gql'

type UpdateItemQuantityFormReturn = UseFormGraphQlOptions<
  UpdateItemQuantityMutation,
  UpdateItemQuantityMutationVariables
>

export type UpdateItemQuantityProps = Omit<UpdateItemQuantityMutationVariables, 'cartId'> & {
  formOptions?: Omit<UpdateItemQuantityFormReturn, 'mode' | 'defaultValues'>
  textInputProps?: TextInputNumberProps
  sx?: SxProps<Theme>
}

export function UpdateItemQuantity(props: UpdateItemQuantityProps) {
  const { uid, quantity, sx, textInputProps, formOptions } = props
  const form = useFormGqlMutationCart(UpdateItemQuantityDocument, {
    defaultValues: { uid, quantity },
    mode: 'onChange',
    ...formOptions,
  })
  const { muiRegister, required, handleSubmit, formState, error, reset } = form

  const submit = handleSubmit(() => {})
  useFormAutoSubmit({ form, submit })

  return (
    <form noValidate onSubmit={submit}>
      <TextInputNumber
        size='small'
        variant='standard'
        inputProps={{ min: 1 }}
        InputProps={{ disableUnderline: true }}
        error={!!formState.errors.quantity}
        {...muiRegister('quantity', { required: required.quantity })}
        helperText={formState.errors.quantity?.message}
        sx={sx}
        {...textInputProps}
      />
      <ApolloCartErrorSnackbar error={error} onClose={() => reset({ quantity })} />
    </form>
  )
}
