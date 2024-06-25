import { CheckboxElement, FieldPath, FieldValues, useWatch } from '@graphcommerce/ecommerce-ui'
import { FormRow, useStorefrontConfig } from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react'
import { BusinessCompany } from './BusinessCompany'
import { BusinessVAT } from './BusinessVAT'
import { BusinessFieldsOptions, useBusinessFieldsForm } from './useBusinessFieldsForm'

export type BusinessFieldsProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = BusinessFieldsOptions<TFieldValues, TName> & {
  label?: React.ReactNode
}

export function BusinessFields<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: BusinessFieldsProps<TFieldValues, TName>) {
  const { label = <Trans id='Business' />, ...rest } = props
  const form = useBusinessFieldsForm(rest)
  const { name, control } = form

  const hasBusinessFields = useWatch({ name: name.hasBusinessFields, control })

  const enable =
    useStorefrontConfig().customerBusinessFieldsEnable ??
    import.meta.graphCommerce.customerBusinessFieldsEnable

  if (!enable) return null

  return (
    <>
      <CheckboxElement label={label} control={control} name={name.hasBusinessFields} />
      {hasBusinessFields && (
        <FormRow>
          <BusinessCompany {...props} />
          {import.meta.graphCommerce.magentoVersion >= 245 && <BusinessVAT {...props} />}
        </FormRow>
      )}
    </>
  )
}
