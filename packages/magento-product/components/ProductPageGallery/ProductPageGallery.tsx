import type { MotionImageAspectProps } from '@graphcommerce/framer-scroller'
import type { SidebarGalleryProps, TypeRenderer } from '@graphcommerce/next-ui'
import { filterNonNullableKeys, nonNullable, SidebarGallery } from '@graphcommerce/next-ui'
import type { ProductPageGalleryFragment } from './ProductPageGallery.gql'
import { ProductVideo, type ProductVideoProps } from './ProductVideo'

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

  const images = filterNonNullableKeys(media_gallery)
    .filter((p) => p.disabled !== true)
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map<MotionImageAspectProps<ProductVideoProps>>((item) => {
      const src = item.url ?? ''
      const alt = item.label || undefined
      if (item.__typename === 'ProductImage') return { src, alt, width, height }
      return {
        src,
        alt,
        width: 1280,
        height: 720,
        sx: { objectFit: 'cover' },
        Additional: ProductVideo,
        slotProps: {
          additional: { video: item, width: 1280, height: 720 },
        },
      }
    })

  return (
    <SidebarGallery
      {...sidebarProps}
      sidebar={children}
      aspectRatio={[width, height]}
      images={images}
    />
  )
}
