import { FieldPath, FieldValues } from '@graphcommerce/ecommerce-ui'
import { FormRow } from '@graphcommerce/next-ui'
import { AddressAddition } from './AddressAddition'
import { AddressCity } from './AddressCity'
import { AddressCountryRegion } from './AddressCountryRegion'
import { AddressHousenumber } from './AddressHouseNumber'
import { AddressPostcode } from './AddressPostcode'
import { AddressStreet } from './AddressStreet'
import { AddressFieldsOptions } from './useAddressFieldsForm'

export type AddressFieldsProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = AddressFieldsOptions<TFieldValues, TName> & { countryFirst?: boolean; disabled?: boolean }

export function AddressFields<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: AddressFieldsProps<TFieldValues, TName>) {
  const { countryFirst } = props

  return (
    <>
      {countryFirst && <AddressCountryRegion {...props} />}
      <FormRow>
        <AddressStreet {...props} />
        <AddressHousenumber {...props} />
        <AddressAddition {...props} />
      </FormRow>
      <FormRow>
        <AddressPostcode {...props} />
        <AddressCity {...props} />
      </FormRow>
      {!countryFirst && <AddressCountryRegion {...props} />}
    </>
  )
}
