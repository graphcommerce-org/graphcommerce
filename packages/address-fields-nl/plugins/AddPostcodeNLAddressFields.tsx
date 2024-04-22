import { FieldPath, FieldValues, useWatch } from '@graphcommerce/ecommerce-ui'
import {
  useAddressFieldsForm,
  AddressAddition,
  AddressCity,
  AddressCountryRegion,
  AddressFieldsProps,
  AddressHousenumber,
  AddressPostcode,
  AddressStreet,
} from '@graphcommerce/magento-customer'
import type { PluginProps } from '@graphcommerce/next-config'
import { FormRow } from '@graphcommerce/next-ui'
import { PostcodeNLAutoFill } from '../components/PostcodeNLAutoFill'

export const component = 'AddressFields'
export const exported = '@graphcommerce/magento-customer/components/AddressFields/AddressFields'

function AddPostcodeNLAddressFields<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: PluginProps<AddressFieldsProps<TFieldValues, TName>>) {
  const { Prev } = props
  const { control, name } = useAddressFieldsForm(props)
  const country = useWatch({ control, name: name.countryCode })

  return (
    <>
      {country === 'NL' ? (
        <>
          <AddressCountryRegion {...props} />
          <FormRow>
            <AddressPostcode {...props} />
            <AddressHousenumber {...props} />
            <AddressAddition {...props} />
          </FormRow>
          <FormRow>
            <AddressStreet {...props} />
            <AddressCity {...props} />
          </FormRow>
        </>
      ) : (
        <Prev countryFirst {...props} />
      )}
      <PostcodeNLAutoFill {...props} />
    </>
  )
}

export const Plugin = AddPostcodeNLAddressFields
