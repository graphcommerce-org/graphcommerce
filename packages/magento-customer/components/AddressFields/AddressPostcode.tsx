import { FieldPath, FieldValues, TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { InputCheckmark } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { AddressFieldsOptions, useAddressFieldsForm } from './useAddressFieldsForm'

export function AddressPostcode<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: AddressFieldsOptions<TFieldValues, TName>) {
  const form = useAddressFieldsForm<TFieldValues, TName>(props)
  const { control, name, readOnly, required, valid } = form

  return (
    <TextFieldElement
      control={control}
      name={name.postcode}
      variant='outlined'
      type='text'
      required={required[name.postcode]}
      label={<Trans id='Postcode' />}
      InputProps={{
        readOnly,
        endAdornment: <InputCheckmark show={valid[name.postcode]} />,
      }}
    />
  )
}
