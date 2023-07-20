import type { ProductPageGallery } from '@graphcommerce/magento-product'
import type { IfConfig, PluginProps } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductPageGallery'
export const exported = '@graphcommerce/magento-product'
export const ifConfig: IfConfig = 'configurableVariantValues.content'

function ConfigurableProductPageGallery(
  props: PluginProps<React.ComponentProps<typeof ProductPageGallery>>,
) {
  const { Prev, product, index = 0, ...rest } = props

  const { configured } = useConfigurableOptionsSelection({ url_key: product.url_key, index })
  const media_gallery =
    (configured?.configurable_product_options_selection?.media_gallery?.length ?? 0) > 0
      ? configured?.configurable_product_options_selection?.media_gallery
      : product.media_gallery

  return <Prev product={{ ...product, media_gallery }} {...rest} />
}
export const Plugin = ConfigurableProductPageGallery
