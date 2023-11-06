import { AddressFieldsProps } from '@graphcommerce/magento-customer'
import type { PluginProps } from '@graphcommerce/next-config'
import { PostcodeNLAddressFields } from '../components/PostcodeNLAddressFields'
import { useFormContext, useWatch } from '@graphcommerce/ecommerce-ui'

export const component = 'AddressFields'

export const exported = '@graphcommerce/magento-customer/components/AddressFields/AddressFields'

function AddPostcodeNLAddressFields(props: PluginProps<AddressFieldsProps>) {
  const { Prev, countryFirst } = props
  const methods = useFormContext()
  const country = useWatch({ control: methods.control, name: 'country' })
  return country === 'NL' ? (
    <PostcodeNLAddressFields countryFirst {...props} />
  ) : (
    <Prev countryFirst={countryFirst} {...props} />
  )
}

export const Plugin = AddPostcodeNLAddressFields
