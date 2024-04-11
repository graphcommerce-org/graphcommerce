import {
  FieldValues,
  FieldPath,
  UseFormReturn,
  assertFormGqlOperation,
} from '@graphcommerce/react-hook-form'

export type AddressFieldsOptions<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  // eslint-disable-next-line react/no-unused-prop-types
  form: UseFormReturn<TFieldValues>

  // eslint-disable-next-line react/no-unused-prop-types
  readOnly?: boolean

  // eslint-disable-next-line react/no-unused-prop-types
  name?: {
    street?: TName
    houseNumber?: TName
    addition?: TName
    countryCode?: TName
    regionId?: TName
    postcode?: TName
    city?: TName
  }
}

export function useAddressFieldsForm<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: AddressFieldsOptions<TFieldValues, TName>) {
  const { form, readOnly } = props
  assertFormGqlOperation<TFieldValues>(form)
  return {
    ...form,
    name: {
      street: 'street' as TName,
      houseNumber: 'houseNumber' as TName,
      addition: 'addition' as TName,
      countryCode: 'countryCode' as TName,
      regionId: 'regionId' as TName,
      postcode: 'postcode' as TName,
      city: 'city' as TName,
      ...props.name,
    },
    readOnly,
  }
}
