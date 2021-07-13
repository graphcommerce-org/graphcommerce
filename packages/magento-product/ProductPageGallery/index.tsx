import { SliderImage, SidebarGallery, RenderType, TypeRenderer } from '@reachdigital/next-ui'
import React, { PropsWithChildren } from 'react'
import ProductImage from './ProductImage'
import { ProductPageGalleryFragment } from './ProductPageGallery.gql'
import ProductVideo from './ProductVideo'

export type ProductPageGalleryRenderers = TypeRenderer<
  NonNullable<NonNullable<ProductPageGalleryFragment['media_gallery']>[0]>
>
const renderers: ProductPageGalleryRenderers = { ProductImage, ProductVideo }

type ProductPageGalleryProps = PropsWithChildren<ProductPageGalleryFragment>

export default function ProductPageGallery(props: ProductPageGalleryProps) {
  const { media_gallery, children } = props

  return (
    <SidebarGallery sidebar={children} aspectRatio={[1678, 1532]}>
      {media_gallery?.map((item) => {
        if (!item?.position) return null
        return (
          <SliderImage key={item.position} width={1532} height={1678}>
            <RenderType renderer={renderers} {...item} />
          </SliderImage>
        )
      })}
    </SidebarGallery>
  )
}
