import type { AddToCartItemSelector, StickyAddToCart } from '@graphcommerce/magento-product'
import type { IfConfig, ReactPlugin } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../../hooks'

export const component = 'StickyAddToCart'
export const exported = '@graphcommerce/magento-product/components/StickyAddToCart/StickyAddToCart'
export const ifConfig: IfConfig = 'enableStickyAddToCart'

type PluginType = ReactPlugin<typeof StickyAddToCart, AddToCartItemSelector>

const ConfigurableStickyAddToCart: PluginType = (props) => {
  const { Prev, product, ...rest } = props
  const variant = useConfigurableSelectedVariant({ url_key: product.url_key, index: 0 })

  return <Prev product={variant ?? product} {...rest} />
}

export const Plugin = ConfigurableStickyAddToCart
