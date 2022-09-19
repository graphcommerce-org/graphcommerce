import { ProductPageGallery, ProductPageGalleryProps } from '@graphcommerce/magento-product'
import { useConfigurableOptionsSelection } from '../../hooks/useConfigurableOptionsSelection'

type ConfigurableProductPageGalleryProps = ProductPageGalleryProps

/** Compatible with any product type, but will switch the image when used for a ConfigurableProduct */
export function ConfigurableProductPageGallery(props: ConfigurableProductPageGalleryProps) {
  const { media_gallery } = props

  const { configured } = useConfigurableOptionsSelection()
  const media =
    (configured?.configurable_product_options_selection?.media_gallery?.length ?? 0) > 0
      ? configured?.configurable_product_options_selection?.media_gallery
      : media_gallery

  return <ProductPageGallery {...props} media_gallery={media} />
}
