import RichText from '@reachdigital/graphcms-ui/RichText'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import ProductFeature from '@reachdigital/next-ui/Row/ProductFeature'
import React from 'react'
import { ProductFeatureMediaFragment } from './ProductFeatureMedia.gql'
import { RowProductFeatureFragment } from './RowProductFeature.gql'

type ProductFeatureProps = RowProductFeatureFragment & ProductFeatureMediaFragment

export default function RowProductFeature(props: ProductFeatureProps) {
  const { copy, topic, media_gallery } = props

  const item = media_gallery?.[2] ?? media_gallery?.[0]
  if (!item) return null

  return (
    <ProductFeature
      topic={topic}
      item={
        item.__typename === 'ProductImage' &&
        item.url && (
          <PictureResponsiveNext
            alt={item.label ?? ''}
            width={328}
            height={328}
            src={item.url}
            type='image/jpeg'
          />
        )
      }
      RichContent={(richTextOneClasses) => <RichText {...richTextOneClasses} {...copy} />}
    />
  )
}
