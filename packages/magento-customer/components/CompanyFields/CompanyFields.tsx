import { CheckboxElement, FieldPath, FieldValues, useWatch } from '@graphcommerce/ecommerce-ui'
import { FormRow, useStorefrontConfig } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { CompanyName } from './CompanyName'
import { CompanyVAT } from './CompanyVAT'
import { CompanyFieldsOptions, useCompanyFieldsForm } from './useCompanyFieldsForm'

export type CompanyFieldsProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = CompanyFieldsOptions<TFieldValues, TName> & {
  label?: React.ReactNode
}

export function CompanyFields<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: CompanyFieldsProps<TFieldValues, TName>) {
  const { label = <Trans id='Company' />, ...rest } = props
  const form = useCompanyFieldsForm(rest)
  const { name, control } = form

  const isCompany = useWatch({ name: name.isCompany, control })

  const enable =
    useStorefrontConfig().customerCompanyFieldsEnable ??
    import.meta.graphCommerce.customerCompanyFieldsEnable

  if (!enable) return null

  return (
    <>
      <CheckboxElement label={label} control={control} name={name.isCompany} />
      {isCompany && (
        <FormRow>
          <CompanyName {...props} />
          {import.meta.graphCommerce.magentoVersion >= 245 && <CompanyVAT {...props} />}
        </FormRow>
      )}
    </>
  )
}
