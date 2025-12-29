import type {
  AddToCartItemSelector,
  JsonLdProductFragment,
  ProductPageJsonLdProps,
} from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { isTypename } from '@graphcommerce/next-ui'
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
  const variant = useConfigurableSelectedVariant({ ...product, index })

  if (product.__typename !== 'ConfigurableProduct') return <Prev product={product} {...rest} />

  return <Prev product={(variant ?? product) as P} {...rest} />
}
