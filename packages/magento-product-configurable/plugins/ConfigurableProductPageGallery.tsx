import type { ProductPageGalleryProps } from '@graphcommerce/magento-product'
import type { PluginProps } from '@graphcommerce/next-config'
import { useConfigurableOptionsSelection } from '../hooks'

export const component = 'ProductPageGallery'
export const exported = '@graphcommerce/magento-product'

type ConfigurableProductPageGalleryProps = ProductPageGalleryProps & {
  index?: number
}

function ConfigurableProductPageGallery(props: PluginProps<ConfigurableProductPageGalleryProps>) {
  const { Prev, media_gallery, url_key, index = 0, ...rest } = props

  const { configured } = useConfigurableOptionsSelection({ url_key, index })
  const media =
    (configured?.configurable_product_options_selection?.media_gallery?.length ?? 0) > 0
      ? configured?.configurable_product_options_selection?.media_gallery
      : media_gallery

  return <Prev {...rest} media_gallery={media} />
}
export const Plugin = ConfigurableProductPageGallery
