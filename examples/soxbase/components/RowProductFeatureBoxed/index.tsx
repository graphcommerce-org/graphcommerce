import RichText from '@reachdigital/graphcms-ui/RichText'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import ProductFeatureBoxed from '@reachdigital/next-ui/Row/ProductFeatureBoxed'
import React from 'react'
import { ProductFeatureMediaBoxedFragment } from './ProductFeatureMediaBoxed.gql'
import { RowProductFeatureBoxedFragment } from './RowProductFeatureBoxed.gql'

type RowProductFeatureBoxedProps = RowProductFeatureBoxedFragment & ProductFeatureMediaBoxedFragment

export default function RowProductFeatureBoxedBoxed(props: RowProductFeatureBoxedProps) {
  const { copy, topic, media_gallery } = props
  const item = media_gallery?.[1] ?? media_gallery?.[0]

  if (!item) return null

  return (
    <ProductFeatureBoxed
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
