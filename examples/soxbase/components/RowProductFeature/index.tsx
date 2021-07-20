import { Typography } from '@material-ui/core'
import RichText from '@reachdigital/graphcms-ui/RichText'
import { Image } from '@reachdigital/image'
import { RowImageText } from '@reachdigital/next-ui'
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
        item.url && <Image alt={item.label ?? ''} width={328} height={328} src={item.url} />
      }
    >
      {topic && <Typography variant='captionOldOld'>{topic}</Typography>}
      <RichText {...copy} />
    </RowImageText>
  )
}
