import type {
  AddToCartItemSelector,
  JsonLdProductFragment,
  ProductPageJsonLdProps,
} from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../../hooks'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
  ifConfig: 'configurableVariantValues.content',
}

export function ProductPageJsonLd<T extends { '@type': string }, P extends JsonLdProductFragment>(
  props: PluginProps<ProductPageJsonLdProps<T, P>> & AddToCartItemSelector,
) {
  const { Prev, product, index, ...rest } = props
  const variant = useConfigurableSelectedVariant({ url_key: product.url_key, index })
  return <Prev product={(variant ?? product) as P} {...rest} />
}
