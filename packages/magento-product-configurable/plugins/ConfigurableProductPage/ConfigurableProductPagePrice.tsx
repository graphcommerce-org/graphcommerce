import { AddToCartItemSelector, ProductPagePriceProps } from '@graphcommerce/magento-product'
import type { PluginProps } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../../hooks'

export const component = 'ProductPagePrice'
export const exported = '@graphcommerce/magento-product'

const ConfigurableProductPagePrice = (
  props: PluginProps<ProductPagePriceProps> & AddToCartItemSelector,
) => {
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
