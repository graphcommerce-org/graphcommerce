import { AddressFieldsProps } from '@graphcommerce/magento-customer'
import type { PluginProps } from '@graphcommerce/next-config'
import { PostcodeNLAddressFields } from '../components/PostcodeNLAddressFields'

export const component = 'AddressFields'

export const exported = '@graphcommerce/magento-customer'

function AddPostcodeNLAddressFields(props: PluginProps<AddressFieldsProps>) {
  const { form, Prev } = props
  const country = form.watch('countryCode')
  return country === 'NL' ? <PostcodeNLAddressFields {...props} /> : <Prev {...props} />
}

export const Plugin = AddPostcodeNLAddressFields
