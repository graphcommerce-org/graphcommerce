import type { FieldValues, FieldPath, UseFormReturn } from '@graphcommerce/react-hook-form'
import { assertFormGqlOperation } from '@graphcommerce/react-hook-form'

export type CompanyFieldsOptions<
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
    vatId?: TName
    isCompany?: TName
    countryCode?: TName
  }
}

export function useCompanyFieldsForm<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: CompanyFieldsOptions<TFieldValues, TName>) {
  const { form, readOnly } = props
  assertFormGqlOperation<TFieldValues>(form)
  return {
    ...form,
    name: {
      company: 'company' as TName,
      vatId: 'vatId' as TName,
      isCompany: 'isCompany' as TName,
      countryCode: 'countryCode' as TName,
      ...props.name,
    },
    readOnly,
  }
}
