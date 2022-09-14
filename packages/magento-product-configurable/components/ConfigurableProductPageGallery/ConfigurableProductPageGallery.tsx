import { ProductPageGallery, ProductPageGalleryProps } from '@graphcommerce/magento-product'
import { useConfigurableTypeProduct } from '../../hooks/useConfigurableTypeProduct'

type ConfigurableProductPageGalleryProps = ProductPageGalleryProps

export function ConfigurableProductPageGallery(props: ConfigurableProductPageGalleryProps) {
  const { media_gallery } = props

  const { typeProduct } = useConfigurableTypeProduct()
  const media = typeProduct?.configurable_product_options_selection?.media_gallery ?? media_gallery

  return <ProductPageGallery {...props} media_gallery={media} />
}
