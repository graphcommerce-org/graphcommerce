import GQLRenderType, { GQLTypeRenderer } from 'components/GQLRenderType'
import { GQLProductPageGalleryFragment } from 'generated/graphql'
import React from 'react'
import ProductImage from './ProductImage'
import ProductVideo from './ProductVideo'

export type ProductPageGalleryRenderers = GQLTypeRenderer<
  NonNullable<NonNullable<GQLProductPageGalleryFragment['media_gallery']>[0]>
>
const renderers: ProductPageGalleryRenderers = { ProductImage, ProductVideo }

export default function ProductPageGallery(props: GQLProductPageGalleryFragment) {
  const { media_gallery, sku } = props

  return (
    <div>
      {media_gallery?.map((item) => {
        if (!item?.position) return null
        return (
          <GQLRenderType
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
