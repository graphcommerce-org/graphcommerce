import { AddToCartItemSelector, type ProductPagePrice } from '@graphcommerce/magento-product'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductPagePrice'
export const exported = '@graphcommerce/magento-product'

type PluginType = ReactPlugin<typeof ProductPagePrice, AddToCartItemSelector>

const ConfigurableProductPagePrice: PluginType = (props) => {
  const { Prev, product, index, ...rest } = props
  const { configured } = useConfigurableOptionsSelection({ url_key: product.url_key, index })
  const variant = configured?.configurable_product_options_selection?.variant

  return <Prev product={variant ?? product} index={index} {...rest} />
}

export const Plugin = ConfigurableProductPagePrice
