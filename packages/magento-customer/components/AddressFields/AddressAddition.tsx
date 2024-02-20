import { TextFieldElement, FieldValues, FieldPath } from '@graphcommerce/ecommerce-ui'
import { InputCheckmark } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { AddressFieldsOptions, useAddressFieldsForm } from './useAddressFieldsForm'

export function AddressAddition<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: AddressFieldsOptions<TFieldValues, TName>) {
  const form = useAddressFieldsForm<TFieldValues, TName>(props)
  const { control, name, readOnly, required, valid } = form

  return (
    <TextFieldElement
      control={control}
      name={name.addition}
      variant='outlined'
      type='text'
      required={required[name.addition]}
      label={<Trans id='Addition' />}
      autoComplete='address-line3'
      InputProps={{
        readOnly,
        endAdornment: <InputCheckmark show={valid[name.addition]} />,
      }}
    />
  )
}
