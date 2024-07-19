import type { AddToCartItemSelector, ProductPageGalleryProps } from '@graphcommerce/magento-product'
import type { PluginConfig, PluginProps } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../../hooks'

export const config: PluginConfig = {
  type: 'component',
  module: '@graphcommerce/magento-product',
}

export function ProductPageGallery(
  props: PluginProps<ProductPageGalleryProps> & AddToCartItemSelector,
) {
  const { Prev, product, index, ...rest } = props

  const { configured } = useConfigurableOptionsSelection({ url_key: product.url_key, index })
  const media_gallery =
    (configured?.configurable_product_options_selection?.media_gallery?.length ?? 0) > 0 &&
    configured?.configurable_product_options_selection?.variant
      ? configured?.configurable_product_options_selection?.media_gallery
      : product.media_gallery

  return <Prev product={{ ...product, media_gallery }} {...rest} />
}
