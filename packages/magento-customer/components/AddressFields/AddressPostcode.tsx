import { FieldPath, FieldValues, TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { Trans } from '@lingui/macro'
import { AddressFieldsOptions, useAddressFieldsForm } from './useAddressFieldsForm'

export function AddressPostcode<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: AddressFieldsOptions<TFieldValues, TName>) {
  const form = useAddressFieldsForm<TFieldValues, TName>(props)
  const { control, name, required } = form

  return (
    <TextFieldElement
      control={control}
      name={name.postcode}
      variant='outlined'
      type='text'
      required={required[name.postcode]}
      label={<Trans>Postcode</Trans>}
      showValid
    />
  )
}
