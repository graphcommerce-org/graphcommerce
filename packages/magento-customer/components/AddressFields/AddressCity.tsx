import { TextFieldElement, FieldValues, FieldPath } from '@graphcommerce/ecommerce-ui'
import { Trans } from '@lingui/react'
import { AddressFieldsOptions, useAddressFieldsForm } from './useAddressFieldsForm'

export function AddressCity<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: AddressFieldsOptions<TFieldValues, TName>) {
  const form = useAddressFieldsForm<TFieldValues, TName>(props)
  const { control, name, readOnly, required } = form

  return (
    <TextFieldElement
      {...props}
      control={control}
      name={name.city}
      variant='outlined'
      type='text'
      required={required[name.city]}
      label={<Trans id='City' />}
      showValid
      InputProps={{ readOnly }}
    />
  )
}
