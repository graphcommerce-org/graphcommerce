import {
  AddToCartItemSelector,
  ProductPagePriceFragment,
  type ProductPagePrice,
} from '@graphcommerce/magento-product'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../../hooks'

export const component = 'ProductPagePrice'
export const exported =
  '@graphcommerce/magento-product/components/ProductPagePrice/ProductPagePrice'

type PluginType = ReactPlugin<typeof ProductPagePrice, AddToCartItemSelector>

const ConfigurableProductPagePrice: PluginType = (props) => {
  const { Prev, product, index, ...rest } = props
  const variant = useConfigurableSelectedVariant({ url_key: product.url_key, index })

  if (product.__typename === 'GroupedProduct') return <Prev {...props} />
  const finalProduct: ProductPagePriceFragment = variant
    ? { ...variant, options: product.options }
    : product

  return <Prev product={finalProduct} index={index} {...rest} />
}

export const Plugin = ConfigurableProductPagePrice
