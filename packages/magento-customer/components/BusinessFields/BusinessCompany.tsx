import { TextFieldElement, FieldValues, FieldPath } from '@graphcommerce/ecommerce-ui'
import { Trans } from '@lingui/react'
import { BusinessFieldsOptions, useBusinessFieldsForm } from './useBusinessFieldsForm'

export function BusinessCompany<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: BusinessFieldsOptions<TFieldValues, TName>) {
  const form = useBusinessFieldsForm<TFieldValues, TName>(props)
  const { control, name, readOnly } = form

  return (
    <TextFieldElement
      control={control}
      name={name.company}
      variant='outlined'
      type='text'
      required
      label={<Trans id='Company name' />}
      showValid
      InputProps={{ readOnly }}
    />
  )
}
