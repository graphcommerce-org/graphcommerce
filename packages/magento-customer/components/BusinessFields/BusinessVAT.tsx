import { TextFieldElement, FieldValues, FieldPath, useWatch } from '@graphcommerce/ecommerce-ui'
import { CountryCodeEnum } from '@graphcommerce/graphql-mesh'
import { Trans } from '@lingui/react'
import { BusinessFieldsOptions, useBusinessFieldsForm } from './useBusinessFieldsForm'

export function BusinessVAT<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  props: BusinessFieldsOptions<TFieldValues, TName> & {
    required?: boolean
    optional?: CountryCodeEnum[]
  },
) {
  const { required, optional } = props
  const form = useBusinessFieldsForm<TFieldValues, TName>(props)
  const { control, name, readOnly } = form

  const countryCode = useWatch({ control, name: name.countryCode })

  return (
    <TextFieldElement
      control={control}
      name={name.vatId}
      variant='outlined'
      type='text'
      required={required ? !optional?.includes(countryCode) : optional?.includes(countryCode)}
      label={<Trans id='VAT' />}
      showValid
      InputProps={{ readOnly }}
    />
  )
}
