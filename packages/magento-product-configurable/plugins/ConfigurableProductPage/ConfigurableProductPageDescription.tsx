import type {
  AddToCartItemSelector,
  ProductPageDescriptionProps,
} from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useConfigurableSelectedVariant } from '../../hooks'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
  ifConfig: 'configurableVariantValues.content',
}

export function ProductPageDescription(
  props: PluginProps<ProductPageDescriptionProps & AddToCartItemSelector>,
) {
  const { Prev, product, index, ...rest } = props
  const variant = useConfigurableSelectedVariant({ url_key: product.url_key, index })

  return (
    <Prev
      product={{
        ...product,
        description: variant?.description?.html ? variant?.description : product.description,
        short_description: variant?.short_description?.html
          ? variant?.short_description
          : product.short_description,
      }}
      {...rest}
    />
  )
}
