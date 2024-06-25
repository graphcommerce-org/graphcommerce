import { TextFieldElement, FieldValues, FieldPath } from '@graphcommerce/ecommerce-ui'
import { Trans } from '@lingui/react'
import { BusinessFieldsOptions, useBusinessFieldsForm } from './useBusinessFieldsForm'

export function BusinessCompany<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: BusinessFieldsOptions<TFieldValues, TName>) {
  const form = useBusinessFieldsForm<TFieldValues, TName>(props)
  const { control, name, readOnly, required } = form

  return (
    <TextFieldElement
      control={control}
      name={name.company}
      variant='outlined'
      type='text'
      required={required[name.company]}
      label={<Trans id='Company' />}
      showValid
      InputProps={{ readOnly }}
    />
  )
}
