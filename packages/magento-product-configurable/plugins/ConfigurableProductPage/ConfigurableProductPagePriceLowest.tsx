import type { ProductPagePriceLowestProps } from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../../hooks'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
}

export function ProductPagePriceLowest(props: PluginProps<ProductPagePriceLowestProps>) {
  const { Prev, product, index, ...rest } = props
  const variant = useConfigurableSelectedVariant({ ...product, index })

  if (product.__typename !== 'ConfigurableProduct') return <Prev {...props} />

  return (
    <Prev
      product={variant ? { ...variant, options: product.options } : product}
      index={index}
      {...rest}
    />
  )
}
