import type { FieldPath, FieldValues } from '@graphcommerce/ecommerce-ui'
import { TextFieldElement, houseNumberPattern } from '@graphcommerce/ecommerce-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import type { AddressFieldsOptions } from './useAddressFieldsForm'
import { useAddressFieldsForm } from './useAddressFieldsForm'

export function AddressHousenumber<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: AddressFieldsOptions<TFieldValues, TName>) {
  const form = useAddressFieldsForm<TFieldValues, TName>(props)
  const { control, name, readOnly, required } = form
  return (
    <TextFieldElement
      control={control}
      name={name.houseNumber}
      required={required[name.houseNumber]}
      rules={{
        pattern: {
          value: houseNumberPattern,
          message: i18n._(/* i18n */ 'Please provide a valid house number'),
        },
      }}
      variant='outlined'
      type='text'
      label={<Trans id='Housenumber' />}
      autoComplete='address-line2'
      showValid
      InputProps={{ readOnly }}
    />
  )
}
