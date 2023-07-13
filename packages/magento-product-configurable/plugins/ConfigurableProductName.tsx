import type { ProductNameProps } from '@graphcommerce/magento-product'
import type { PluginProps, IfConfig } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductName'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.name'

type ConfigurableProductNameProps = ProductNameProps

function ConfigurableProductName(props: PluginProps<ConfigurableProductNameProps>) {
  const { Prev, product, ...rest } = props
  const variant = useConfigurableOptionsSelection({ url_key: product?.url_key, index: 0 })
    .configured?.configurable_product_options_selection?.variant

  return <Prev product={variant ?? product} {...rest} />
}
export const Plugin = ConfigurableProductName
