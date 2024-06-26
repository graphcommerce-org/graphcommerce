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
    vatId?: TName
    isBusiness?: TName
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
      vatId: 'vatId' as TName,
      isBusiness: 'isBusiness' as TName,
      countryCode: 'countryCode' as TName,
      ...props.name,
    },
    readOnly,
  }
}
