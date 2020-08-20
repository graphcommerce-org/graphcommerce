import { debounce } from '@material-ui/core'
import TextInputNumber from 'components/TextInputNumber'
import { useMutationForm } from 'components/useMutationForm'
import { UpdateItemQuantityDocument } from 'generated/apollo'
import React, { useRef } from 'react'

export default function UpdateItemQuantity(props: GQLUpdateItemQuantityMutationVariables) {
  const { register, errors, onSubmit, required, result } = useMutationForm<
    GQLUpdateItemQuantityMutation,
    GQLUpdateItemQuantityMutationVariables
  >({ mutation: UpdateItemQuantityDocument, values: props, mode: 'onChange' })
  const ref = useRef<HTMLInputElement>(null)
  register(ref.current, { required: required.quantity })

  return (
    <form noValidate onChange={debounce(onSubmit, 600)}>
      <TextInputNumber
        size='small'
        label='Quantity'
        variant='outlined'
        inputProps={{ min: 1 }}
        error={!!errors.quantity}
        id='quantity'
        name='quantity'
        required={required.quantity}
        inputRef={ref}
        helperText={errors?.quantity?.message}
        disabled={result.loading}
      />
    </form>
  )
}
