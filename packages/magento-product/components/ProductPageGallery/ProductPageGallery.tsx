import {
  nonNullable,
  SidebarGallery,
  SidebarGalleryProps,
  TypeRenderer,
} from '@graphcommerce/next-ui'
import { Theme, useMediaQuery } from '@mui/material'
import { GridGallery } from './GridGallery'
import { ProductPageGalleryFragment } from './ProductPageGallery.gql'

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
  const isMobile = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'))

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

  const gridGalleryEnabled =
    import.meta.graphCommerce.sidebarGallery?.paginationVariant === 'GRID' && !isMobile

  if (gridGalleryEnabled) {
    return (
      <GridGallery
        {...sidebarProps}
        sidebar={children}
        aspectRatio={[width, height]}
        images={images}
      />
    )
  }

  return (
    <SidebarGallery
      {...sidebarProps}
      sidebar={children}
      aspectRatio={[width, height]}
      images={images}
    />
  )
}
