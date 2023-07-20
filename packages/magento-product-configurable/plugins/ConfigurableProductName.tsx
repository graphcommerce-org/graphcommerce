import type { AddToCartItemSelector, ProductName } from '@graphcommerce/magento-product'
import type { IfConfig, ReactPlugin } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductName'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.content'

type PluginType = ReactPlugin<typeof ProductName, AddToCartItemSelector>

const ConfigurableProductName: PluginType = (props) => {
  const { Prev, product, index, ...rest } = props
  const variant = useConfigurableOptionsSelection({ url_key: product.url_key, index }).configured
    ?.configurable_product_options_selection?.variant

  return <Prev product={variant ?? product} {...rest} />
}

export const Plugin = ConfigurableProductName
