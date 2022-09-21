import { ProductPageGallery, ProductPageGalleryProps } from '@graphcommerce/magento-product'
import { useConfigurableOptionsSelection } from '../../hooks/useConfigurableOptionsSelection'

type ConfigurableProductPageGalleryProps = ProductPageGalleryProps & {
  url_key?: string | null
  index?: number
}

/** Compatible with any product type, but will switch the image when used for a ConfigurableProduct */
export function ConfigurableProductPageGallery(props: ConfigurableProductPageGalleryProps) {
  const { media_gallery, url_key, index = 0 } = props

  const { configured } = useConfigurableOptionsSelection({ url_key, index })
  const media =
    (configured?.configurable_product_options_selection?.media_gallery?.length ?? 0) > 0
      ? configured?.configurable_product_options_selection?.media_gallery
      : media_gallery

  return <ProductPageGallery {...props} media_gallery={media} />
}
