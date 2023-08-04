import type { AddToCartItemSelector, ProductPagePriceTiers } from '@graphcommerce/magento-product'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../../hooks'

export const component = 'ProductPagePriceTiers'
export const exported =
  '@graphcommerce/magento-product/components/ProductPagePrice/ProductPagePriceTiers'

type PluginType = ReactPlugin<typeof ProductPagePriceTiers, AddToCartItemSelector>

const ConfigurableProductPagePriceTiers: PluginType = (props) => {
  const { Prev, product, index, ...rest } = props
  const variant = useConfigurableSelectedVariant({ url_key: product.url_key, index })

  if (!variant) return null

  return <Prev product={variant} {...rest} />
}

export const Plugin = ConfigurableProductPagePriceTiers
