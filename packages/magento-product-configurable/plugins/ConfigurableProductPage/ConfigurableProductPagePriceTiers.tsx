import type {
  AddToCartItemSelector,
  ProductPagePriceTiersProps,
} from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../../hooks'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
}

export function ProductPagePriceTiers(
  props: PluginProps<ProductPagePriceTiersProps> & AddToCartItemSelector,
) {
  const { Prev, product, index, ...rest } = props
  const variant = useConfigurableSelectedVariant({ url_key: product.url_key, index })

  if (!variant || product.__typename !== 'ConfigurableProduct')
    return <Prev product={product} {...rest} />

  return <Prev product={{ ...variant, options: product.options }} {...rest} />
}
