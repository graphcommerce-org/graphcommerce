import { Typography } from '@material-ui/core'
import RichText from '@reachdigital/graphcms-ui/RichText'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import RowImageText from '@reachdigital/next-ui/Row/RowImageText'
import React from 'react'
import { ProductFeatureMediaFragment } from './ProductFeatureMedia.gql'
import { RowProductFeatureFragment } from './RowProductFeature.gql'

type ProductFeatureProps = RowProductFeatureFragment & ProductFeatureMediaFragment

export default function RowProductFeature(props: ProductFeatureProps) {
  const { copy, topic, media_gallery } = props
  const item = media_gallery?.[2] ?? media_gallery?.[0]

  if (!item) return null

  return (
    <RowImageText
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
    >
      {topic && <Typography variant='caption'>{topic}</Typography>}
      <RichText {...copy} />
    </RowImageText>
  )
}
