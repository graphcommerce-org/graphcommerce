import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { InputCheckmark } from '@graphcommerce/next-ui'
import { FieldValues, FieldPath } from '@graphcommerce/react-hook-form'
import { Trans } from '@lingui/react'
import { AddressFieldsOptions, useAddressFieldsForm } from './useAddressFieldsForm'

export function AddressStreet<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: AddressFieldsOptions<TFieldValues, TName>) {
  const form = useAddressFieldsForm<TFieldValues, TName>(props)
  const { control, name, readOnly, required, valid } = form
  return (
    <TextFieldElement
      variant='outlined'
      control={control}
      required={required[name.street]}
      name={name.street}
      type='text'
      label={<Trans id='Street' />}
      autoComplete='address-line1'
      InputProps={{
        readOnly,
        endAdornment: <InputCheckmark show={valid[name.street]} />,
      }}
    />
  )
}
