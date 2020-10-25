import { debounce } from '@material-ui/core'
import ClearIcon from '@material-ui/icons/Delete'
import TextInputNumber from '@reachdigital/next-ui/TextInputNumber'
import { useMutationForm } from '@reachdigital/next-ui/useMutationForm'
import { UpdateItemQuantityDocument } from 'generated/documents'
import React, { useRef } from 'react'

export default function UpdateItemQuantity(values: GQLUpdateItemQuantityMutationVariables) {
  const { register, errors, onSubmit, required, watch, loading } = useMutationForm({
    mutation: UpdateItemQuantityDocument,
    values,
    mode: 'onChange',
  })

  const ref = useRef<HTMLInputElement>(null)
  register(ref.current, { required: required.quantity })

  const isTrash = watch('quantity') <= 1

  return (
    <form noValidate onChange={debounce(onSubmit, 600)}>
      <TextInputNumber
        size='small'
        variant='standard'
        inputProps={{ min: isTrash ? 0 : 1 }}
        error={!!errors.quantity}
        id='quantity'
        name='quantity'
        required={required.quantity}
        inputRef={ref}
        helperText={errors?.quantity?.message}
        disabled={loading}
        {...(isTrash && {
          DownProps: {
            children: (
              <ClearIcon
                shapeRendering='geometricPrecision'
                titleAccess='Remove item'
                fontSize='small'
              />
            ),
          },
        })}
      />
    </form>
  )
}
