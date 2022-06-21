import { ProductPageGalleryFragment } from '@graphcommerce/magento-product/components/ProductPageGallery/ProductPageGallery.gql'
import { SidebarGallery, SidebarGalleryProps } from '@graphcommerce/next-ui'
import { PropsWithChildren } from 'react'
import { useConfigurableTypeProduct } from '../../hooks/useConfigurableTypeProduct'

type ConfigurableProductPageGalleryProps = Omit<SidebarGalleryProps, 'sidebar' | 'images'> &
  PropsWithChildren<Pick<ProductPageGalleryFragment, 'media_gallery'>>

export function ConfigurableProductPageGallery(props: ConfigurableProductPageGalleryProps) {
  const {
    media_gallery,
    children,
    aspectRatio: [width, height] = [1532, 1678],
    ...sidebarProps
  } = props

  const typeProduct = useConfigurableTypeProduct()
  const media = typeProduct?.configurable_product_options_selection?.variant
    ? typeProduct?.configurable_product_options_selection?.media_gallery
    : media_gallery

  return (
    <SidebarGallery
      {...sidebarProps}
      sidebar={children}
      aspectRatio={[width, height]}
      images={
        media?.map((item) => {
          if (item?.__typename === 'ProductImage')
            return { src: item.url ?? '', alt: item.label || undefined, width, height }
          return {
            src: '',
            alt: `{${item?.__typename} not yet supported}`,
          }
        }) ?? []
      }
    />
  )
}
