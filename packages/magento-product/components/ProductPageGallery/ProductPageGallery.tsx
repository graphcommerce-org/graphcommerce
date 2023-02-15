import { ScrollerDots } from '@graphcommerce/framer-scroller'
import {
  nonNullable,
  SidebarGallery,
  SidebarGalleryProps,
  TypeRenderer,
} from '@graphcommerce/next-ui'
import { ProductPageGalleryFragment } from './ProductPageGallery.gql'

export type ProductPageGalleryRenderers = TypeRenderer<
  NonNullable<NonNullable<ProductPageGalleryFragment['media_gallery']>[0]>
>

export type ProductPageGalleryProps = ProductPageGalleryFragment &
  Omit<SidebarGalleryProps, 'sidebar' | 'images'> & { children?: React.ReactNode }

export function ProductPageGallery(props: ProductPageGalleryProps) {
  const {
    media_gallery,
    children,
    aspectRatio: [width, height] = [1532, 1678],
    ...sidebarProps
  } = props

  const images =
    media_gallery
      ?.filter(nonNullable)
      .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
      .map((item) => {
        if (item.__typename === 'ProductImage')
          return { src: item.url ?? '', alt: item.label || undefined, width, height }
        return {
          src: '',
          alt: `{${item.__typename} not yet supported}`,
        }
      }) ?? []

  return (
    <SidebarGallery
      {...sidebarProps}
      sidebar={children}
      aspectRatio={[width, height]}
      images={images}
      galleryNavigation={<ScrollerDots />}
    />
  )
}
