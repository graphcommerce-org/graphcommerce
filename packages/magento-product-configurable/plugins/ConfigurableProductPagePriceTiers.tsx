import type { AddToCartItemSelector, ProductPagePriceTiers } from '@graphcommerce/magento-product'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductPagePriceTiers'
export const exported = '@graphcommerce/magento-product'

type PluginType = ReactPlugin<typeof ProductPagePriceTiers, AddToCartItemSelector>

const ConfigurableProductPagePriceTiers: PluginType = (props) => {
  const { Prev, product, index, ...rest } = props
  const variant = useConfigurableOptionsSelection({ url_key: product.url_key, index }).configured
    ?.configurable_product_options_selection?.variant

  if (!variant) return null

  return <Prev product={variant} {...rest} />
}

export const Plugin = ConfigurableProductPagePriceTiers
