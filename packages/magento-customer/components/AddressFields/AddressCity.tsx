import { TextFieldElement, FieldValues, FieldPath } from '@graphcommerce/ecommerce-ui'
import { InputCheckmark } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { AddressFieldsOptions, useAddressFieldsForm } from './useAddressFieldsForm'

export function AddressCity<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: AddressFieldsOptions<TFieldValues, TName>) {
  const form = useAddressFieldsForm<TFieldValues, TName>(props)
  const { control, name, readOnly, required, valid } = form

  return (
    <TextFieldElement
      control={control}
      name={name.city}
      variant='outlined'
      type='text'
      required={required[name.city]}
      label={<Trans id='City' />}
      InputProps={{
        readOnly,
        endAdornment: <InputCheckmark show={valid[name.city]} />,
      }}
    />
  )
}
