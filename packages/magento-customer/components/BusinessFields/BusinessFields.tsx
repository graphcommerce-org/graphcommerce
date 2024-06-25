import { CheckboxElement, FieldPath, FieldValues, useWatch } from '@graphcommerce/ecommerce-ui'
import { CountryCodeEnum } from '@graphcommerce/graphql-mesh'
import { FormRow } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { BusinessCompany } from './BusinessCompany'
import { BusinessVAT } from './BusinessVAT'
import { BusinessFieldsOptions, useBusinessFieldsForm } from './useBusinessFieldsForm'

export type BusinessFieldsProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BusinessFieldsOptions<TFieldValues, TName> & {
  vatRequired: { required?: boolean; optional?: CountryCodeEnum[] }
}

export function BusinessFields<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: BusinessFieldsProps<TFieldValues, TName>) {
  const form = useBusinessFieldsForm(props)
  const { name, control } = form

  const hasCompanyFields = useWatch({ name: name.hasCompanyFields, control })

  return (
    <>
      <CheckboxElement
        label={<Trans id='Business' />}
        control={control}
        name={name.hasCompanyFields}
      />
      {hasCompanyFields && (
        <FormRow>
          <BusinessCompany {...props} />
          <BusinessVAT {...props} />
        </FormRow>
      )}
    </>
  )
}
