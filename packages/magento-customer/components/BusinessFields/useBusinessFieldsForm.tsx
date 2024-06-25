import {
  FieldValues,
  FieldPath,
  UseFormReturn,
  assertFormGqlOperation,
} from '@graphcommerce/react-hook-form'

export type BusinessFieldsOptions<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  // eslint-disable-next-line react/no-unused-prop-types
  form: UseFormReturn<TFieldValues>

  // eslint-disable-next-line react/no-unused-prop-types
  readOnly?: boolean

  // eslint-disable-next-line react/no-unused-prop-types
  name?: {
    company?: TName
    vat_id?: TName
    hasCompanyFields?: TName
    countryCode?: TName
  }
}

export function useBusinessFieldsForm<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: BusinessFieldsOptions<TFieldValues, TName>) {
  const { form, readOnly } = props
  assertFormGqlOperation<TFieldValues>(form)
  return {
    ...form,
    name: {
      company: 'company' as TName,
      vat_id: 'vat_id' as TName,
      hasCompanyFields: 'hasCompanyFields' as TName,
      countryCode: 'countryCode' as TName,
      ...props.name,
    },
    readOnly,
  }
}
