import { NumberFieldElement, NumberFieldElementProps } from '@graphcommerce/ecommerce-ui'
import { ApolloCartErrorSnackbar, useFormGqlMutationCart } from '@graphcommerce/magento-cart'
import { TextInputNumberProps } from '@graphcommerce/next-ui'
import { FormAutoSubmit, UseFormGraphQlOptions } from '@graphcommerce/react-hook-form'
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
  textInputProps?: Omit<
    NumberFieldElementProps<UpdateItemQuantityMutationVariables>,
    'rules' | 'shouldUnregister' | 'defaultValue' | 'control' | 'disabled'
  >
  sx?: SxProps<Theme>
}

export function UpdateItemQuantity(props: UpdateItemQuantityProps) {
  const { uid, quantity, sx, textInputProps, formOptions } = props
  const form = useFormGqlMutationCart(UpdateItemQuantityDocument, {
    experimental_useV2: true,
    defaultValues: { uid, quantity },
    mode: 'onChange',
    ...formOptions,
  })
  const { handleSubmit, formState, error, reset, control } = form

  const submit = handleSubmit(() => {})

  return (
    <form noValidate onSubmit={submit}>
      <FormAutoSubmit control={control} submit={submit} leading />
      <NumberFieldElement
        control={control}
        name='quantity'
        size='small'
        variant='standard'
        inputProps={{ min: 1 }}
        InputProps={{ disableUnderline: true }}
        error={!!formState.errors.quantity}
        helperText={formState.errors.quantity?.message}
        sx={sx}
        {...textInputProps}
      />
      <ApolloCartErrorSnackbar error={error} onClose={() => reset({ quantity })} />
    </form>
  )
}
