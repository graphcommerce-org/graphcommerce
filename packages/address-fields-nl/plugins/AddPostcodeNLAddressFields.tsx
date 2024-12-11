import type { FieldPath, FieldValues } from '@graphcommerce/ecommerce-ui'
import { useWatch } from '@graphcommerce/ecommerce-ui'
import type { AddressFieldsProps } from '@graphcommerce/magento-customer'
import {
  AddressAddition,
  AddressCity,
  AddressCountryRegion,
  AddressHousenumber,
  AddressPostcode,
  AddressStreet,
  useAddressFieldsForm,
} from '@graphcommerce/magento-customer'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { FormRow } from '@graphcommerce/next-ui'
import { PostcodeNLAutoFill } from '../components/PostcodeNLAutoFill'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-customer',
}

export function AddressFields<
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
          <PostcodeNLAutoFill {...props} />
        </>
      ) : (
        <Prev countryFirst {...props} />
      )}
    </>
  )
}
