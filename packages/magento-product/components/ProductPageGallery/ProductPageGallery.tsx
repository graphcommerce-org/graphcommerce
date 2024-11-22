import type { SidebarGalleryProps, TypeRenderer } from '@graphcommerce/next-ui'
import { SidebarGallery, nonNullable } from '@graphcommerce/next-ui'
import type { ProductPageGalleryFragment } from './ProductPageGallery.gql'

export type ProductPageGalleryRenderers = TypeRenderer<
  NonNullable<NonNullable<ProductPageGalleryFragment['media_gallery']>[0]>
>

export type ProductPageGalleryProps = Omit<SidebarGalleryProps, 'sidebar' | 'images'> & {
  product: ProductPageGalleryFragment
  children?: React.ReactNode
}

export function ProductPageGallery(props: ProductPageGalleryProps) {
  const { product, children, aspectRatio: [width, height] = [1532, 1678], ...sidebarProps } = props
  const { media_gallery } = product

  const images =
    media_gallery
      ?.filter(nonNullable)
      .filter((p) => p.disabled !== true)
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .map((item) =>
        item.__typename === 'ProductImage'
          ? {
              src: item.url ?? '',
              alt: item.label || undefined,
              width,
              height,
            }
          : {
              src: '',
              alt: `{${item.__typename} not yet supported}`,
            },
      ) ?? []

  return (
    <SidebarGallery
      {...sidebarProps}
      sidebar={children}
      aspectRatio={[width, height]}
      images={images}
    />
  )
}
