import type { FieldPath, FieldValues } from '@graphcommerce/ecommerce-ui'
import { TextFieldElement, useWatch } from '@graphcommerce/ecommerce-ui'
import type { CountryCodeEnum } from '@graphcommerce/graphql-mesh'
import { Trans } from '@lingui/react'
import type { CompanyFieldsOptions } from './useCompanyFieldsForm'
import { useCompanyFieldsForm } from './useCompanyFieldsForm'

export function CompanyVAT<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: CompanyFieldsOptions<TFieldValues, TName> & {
    required?: boolean
    optional?: CountryCodeEnum[]
  },
) {
  const { required, optional } = props
  const form = useCompanyFieldsForm<TFieldValues, TName>(props)
  const { control, name, readOnly } = form

  const countryCode = useWatch({ control, name: name.countryCode })

  return (
    <TextFieldElement
      control={control}
      name={name.vatId}
      variant='outlined'
      type='text'
      required={required ? !optional?.includes(countryCode) : optional?.includes(countryCode)}
      label={<Trans id='VAT Number' />}
      showValid
      InputProps={{ readOnly }}
    />
  )
}
