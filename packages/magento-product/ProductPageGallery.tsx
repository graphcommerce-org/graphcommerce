import RenderType, { TypeRenderer } from '@reachdigital/next-ui/RenderType'
import React from 'react'
import ProductImage from './ProductImage'
import { ProductPageGalleryFragment } from './ProductPageGallery.graphql'
import ProductVideo from './ProductVideo'

export type ProductPageGalleryRenderers = TypeRenderer<
  NonNullable<NonNullable<ProductPageGalleryFragment['media_gallery']>[0]>
>
const renderers: ProductPageGalleryRenderers = { ProductImage, ProductVideo }

export default function ProductPageGallery(props: ProductPageGalleryFragment) {
  const { media_gallery, sku } = props

  return (
    <div>
      {media_gallery?.map((item) => {
        if (!item?.position) return null
        return (
          <RenderType
            key={item.position}
            renderer={renderers}
            {...item}
            layoutId={item.position === 1 ? sku : ''}
          />
        )
      })}
    </div>
  )
}
