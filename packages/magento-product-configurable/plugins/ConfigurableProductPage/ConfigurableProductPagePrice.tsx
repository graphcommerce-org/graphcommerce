import { AddToCartItemSelector, type ProductPagePrice } from '@graphcommerce/magento-product'
import type { ReactPlugin } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../../hooks'

export const component = 'ProductPagePrice'
export const exported =
  '@graphcommerce/magento-product/components/ProductPagePrice/ProductPagePrice'

type PluginType = ReactPlugin<typeof ProductPagePrice, AddToCartItemSelector>

const ConfigurableProductPagePrice: PluginType = (props) => {
  const { Prev, product, index, ...rest } = props
  const variant = useConfigurableSelectedVariant({ url_key: product.url_key, index })

  if (product.__typename !== 'ConfigurableProduct') return <Prev {...props} />

  return (
    <Prev
      product={variant ? { ...variant, options: product.options } : product}
      index={index}
      {...rest}
    />
  )
}

export const Plugin = ConfigurableProductPagePrice
