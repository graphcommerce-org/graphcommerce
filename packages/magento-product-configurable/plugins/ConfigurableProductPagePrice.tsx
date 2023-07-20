import { AddToCartItemSelector, type ProductPagePrice } from '@graphcommerce/magento-product'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../hooks'

export const component = 'ProductPagePrice'
export const exported = '@graphcommerce/magento-product'

type PluginType = ReactPlugin<typeof ProductPagePrice, AddToCartItemSelector>

const ConfigurableProductPagePrice: PluginType = (props) => {
  const { Prev, product, index, ...rest } = props
  const variant = useConfigurableSelectedVariant({ url_key: product.url_key, index })

  return <Prev product={variant ?? product} index={index} {...rest} />
}

export const Plugin = ConfigurableProductPagePrice
