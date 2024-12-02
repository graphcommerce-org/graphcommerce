import type { FieldPath, FieldValues } from '@graphcommerce/ecommerce-ui'
import { TextFieldElement } from '@graphcommerce/ecommerce-ui'
import { Trans } from '@lingui/react'
import type { CompanyFieldsOptions } from './useCompanyFieldsForm'
import { useCompanyFieldsForm } from './useCompanyFieldsForm'

export function CompanyName<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: CompanyFieldsOptions<TFieldValues, TName>) {
  const form = useCompanyFieldsForm<TFieldValues, TName>(props)
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
