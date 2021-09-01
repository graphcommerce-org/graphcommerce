import { SidebarGallery, SidebarGalleryProps, TypeRenderer } from '@reachdigital/next-ui'
import React, { PropsWithChildren } from 'react'
import { ProductPageGalleryFragment } from './ProductPageGallery.gql'

export type ProductPageGalleryRenderers = TypeRenderer<
  NonNullable<NonNullable<ProductPageGalleryFragment['media_gallery']>[0]>
>

type ProductPageGalleryProps = PropsWithChildren<ProductPageGalleryFragment> &
  Omit<SidebarGalleryProps, 'sidebar' | 'images'>

export default function ProductPageGallery(props: ProductPageGalleryProps) {
  const {
    media_gallery,
    children,
    aspectRatio: [width, height] = [1532, 1678],
    ...sidebarProps
  } = props

  return (
    <SidebarGallery
      {...sidebarProps}
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
