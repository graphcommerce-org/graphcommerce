import type { ProductNameFragment } from '@graphcommerce/magento-product'
import type { PluginProps, IfConfig } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductName'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.name'

type ConfigurableProductNameProps = ProductNameFragment & {
  index?: number
}

function ConfigurableProductName(props: PluginProps<ConfigurableProductNameProps>) {
  const { Prev, name, url_key, index = 0, ...rest } = props
  const variant = useConfigurableOptionsSelection({ url_key, index }).configured
    ?.configurable_product_options_selection?.variant

  return <Prev name={variant?.name ?? name} {...rest} />
}
export const Plugin = ConfigurableProductName
