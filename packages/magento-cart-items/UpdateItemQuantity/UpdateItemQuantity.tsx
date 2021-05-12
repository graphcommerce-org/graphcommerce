import { useFormGqlMutationCart } from '@reachdigital/magento-cart'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import TextInputNumber from '@reachdigital/next-ui/TextInputNumber'
import { useFormAutoSubmit } from '@reachdigital/react-hook-form'
import React from 'react'
import {
  UpdateItemQuantityDocument,
  UpdateItemQuantityMutationVariables,
} from './UpdateItemQuantity.gql'

type UpdateItemQuantityProps = Omit<UpdateItemQuantityMutationVariables, 'cartId'>

export default function UpdateItemQuantity(props: UpdateItemQuantityProps) {
  const { uid, quantity } = props
  const form = useFormGqlMutationCart(UpdateItemQuantityDocument, {
    defaultValues: { uid, quantity },
    mode: 'onChange',
  })

  const { muiRegister, required, handleSubmit, formState, error } = form

  const submit = handleSubmit(() => {})
  useFormAutoSubmit({ form, submit })

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
      <ApolloErrorAlert error={error} />
    </form>
  )
}
