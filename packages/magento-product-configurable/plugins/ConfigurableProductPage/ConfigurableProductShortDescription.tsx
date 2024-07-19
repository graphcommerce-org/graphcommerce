import type {
  AddToCartItemSelector,
  ProductShortDescriptionProps,
} from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../../hooks'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
  ifConfig: 'configurableVariantValues.content',
}

export function ProductShortDescription(
  props: PluginProps<ProductShortDescriptionProps> & AddToCartItemSelector,
) {
  const { Prev, product, ...rest } = props
  const variant = useConfigurableSelectedVariant({ url_key: product.url_key, index: 0 })

  return (
    <Prev
      product={{
        ...product,
        short_description: variant?.short_description?.html
          ? variant?.short_description
          : product.short_description,
      }}
      {...rest}
    />
  )
}
