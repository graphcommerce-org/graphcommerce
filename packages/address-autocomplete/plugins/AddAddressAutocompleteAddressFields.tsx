import type { FieldPath, FieldValues } from '@graphcommerce/ecommerce-ui'
import type { AddressFieldsOptions } from '@graphcommerce/magento-customer'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { AddressAutocomplete } from '../components/AddressAutocomplete'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-customer',
  ifConfig: 'googleMapsApiKey',
}

export function AddressStreet<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(props: PluginProps<AddressFieldsOptions<TFieldValues, TName>>) {
  const { Prev, ...rest } = props

  return <AddressAutocomplete {...rest} fallback={<Prev {...rest} />} />
}
