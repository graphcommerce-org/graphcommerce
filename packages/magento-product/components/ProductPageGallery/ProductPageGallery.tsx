import {
  responsiveVal,
  SidebarGallery,
  SidebarGalleryProps,
  TypeRenderer,
} from '@graphcommerce/next-ui'
import { PropsWithChildren } from 'react'
import { ProductPageGalleryFragment } from './ProductPageGallery.gql'

export type ProductPageGalleryRenderers = TypeRenderer<
  NonNullable<NonNullable<ProductPageGalleryFragment['media_gallery']>[0]>
>

export type ProductPageGalleryProps = PropsWithChildren<ProductPageGalleryFragment> &
  Omit<SidebarGalleryProps, 'sidebar' | 'images'>

export function ProductPageGallery(props: ProductPageGalleryProps) {
  const {
    media_gallery,
    children,
    aspectRatio: [width, height] = [1532, 1678],
    ...sidebarProps
  } = props

  return (
    <SidebarGallery
      {...sidebarProps}
      sx={(theme) => ({
        [SidebarGallery.selectors.sidebar]: {
          display: 'grid !important',
          rowGap: theme.spacings.sm,
        },
        [SidebarGallery.selectors.scroller]: {
          [theme.breakpoints.down('sm')]: {
            top: 0,
          },
        },
        [SidebarGallery.selectors.scrollerContainer]: {
          minHeight: 0,
          [theme.breakpoints.up('md')]: {
            position: 'sticky',
            top: 0,
            // top: theme.spacings.lg,
            // marginTop: theme.spacings.lg,
          },
          '&.zoomed': {
            position: 'relative',
            top: 0,
            marginTop: 0,
          },
        },
        [SidebarGallery.selectors.sidebarWrapper]: {
          [theme.breakpoints.up('md')]: {
            // width: `calc(${responsiveVal(300, 575, theme.breakpoints.values.lg)} + ${
            //   theme.page.horizontal
            // } * 2)`,
          },
        },
      })}
      sidebar={children}
      aspectRatio={[width, height]}
      images={
        media_gallery?.map((item) => {
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
