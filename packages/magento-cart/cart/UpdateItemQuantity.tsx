import { debounce } from '@material-ui/core'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import TextInputNumber from '@reachdigital/next-ui/TextInputNumber'
import useFormGqlMutation from '@reachdigital/react-hook-form/useFormGqlMutation'
import React, { useEffect, useRef } from 'react'
import {
  UpdateItemQuantityDocument,
  UpdateItemQuantityMutationVariables,
} from './UpdateItemQuantity.gql'

export default function UpdateItemQuantity(props: UpdateItemQuantityMutationVariables) {
  const { cartId, cartItemId, quantity } = props
  const form = useFormGqlMutation(UpdateItemQuantityDocument, {
    defaultValues: { cartId, cartItemId, quantity },
    mode: 'onChange',
  })

  const { register, errors, required, handleSubmit, formState, error } = form

  // @todo TextInputNumber can't handle a callback ref
  const ref = useRef<HTMLInputElement>(null)

  useEffect(() => {
    register(ref.current, { required: required.quantity })
  }, [register, required.quantity])

  return (
    <form noValidate onChange={debounce(() => handleSubmit(() => {})(), 500)}>
      <TextInputNumber
        size='small'
        variant='outlined'
        inputProps={{ min: 1 }}
        error={!!errors.quantity}
        id={`quantity-${cartItemId}`}
        name='quantity'
        required={required.quantity}
        inputRef={ref}
        helperText={errors.quantity?.message}
        disabled={formState.isSubmitting}
      />
      <ApolloErrorAlert error={error} />
    </form>
  )
}
