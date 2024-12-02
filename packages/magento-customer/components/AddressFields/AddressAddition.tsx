import type { FieldPath, FieldValues } from '@graphcommerce/ecommerce-ui'
import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { Trans } from '@lingui/react'
import type { AddressFieldsOptions } from './useAddressFieldsForm'
import { useAddressFieldsForm } from './useAddressFieldsForm'

export function AddressAddition<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: AddressFieldsOptions<TFieldValues, TName>) {
  const form = useAddressFieldsForm<TFieldValues, TName>(props)
  const { control, name, readOnly, required } = form

  return (
    <TextFieldElement
      control={control}
      name={name.addition}
      variant='outlined'
      type='text'
      required={required[name.addition]}
      label={<Trans id='Addition' />}
      autoComplete='address-line3'
      showValid
      InputProps={{ readOnly }}
    />
  )
}
