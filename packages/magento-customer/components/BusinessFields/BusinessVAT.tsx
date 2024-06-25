import { TextFieldElement, FieldValues, FieldPath } from '@graphcommerce/ecommerce-ui'
import { Trans } from '@lingui/react'
import { BusinessFieldsOptions, useBusinessFieldsForm } from './useBusinessFieldsForm'

export function BusinessVAT<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: BusinessFieldsOptions<TFieldValues, TName>) {
  const form = useBusinessFieldsForm<TFieldValues, TName>(props)
  const { control, name, readOnly, required } = form

  return (
    <TextFieldElement
      control={control}
      name={name.vat_id}
      variant='outlined'
      type='text'
      required={required[name.vat_id]}
      label={<Trans id='VAT' />}
      showValid
      InputProps={{ readOnly }}
    />
  )
}
