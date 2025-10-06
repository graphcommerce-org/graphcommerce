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
  const { Prev, ...rest } = props
  const { control, name } = useAddressFieldsForm(props)
  const country = useWatch({ control, name: name.countryCode })

  return (
    <>
      {country === 'NL' ? (
        <>
          <AddressCountryRegion {...rest} />
          <FormRow>
            <AddressPostcode {...rest} />
            <AddressHousenumber {...rest} />
            <AddressAddition {...rest} />
          </FormRow>
          <FormRow>
            <AddressStreet {...rest} />
            <AddressCity {...rest} />
          </FormRow>
          <PostcodeNLAutoFill {...rest} />
        </>
      ) : (
        <Prev countryFirst {...rest} />
      )}
    </>
  )
}
