import { Typography } from '@material-ui/core'
import RichText from '@reachdigital/graphcms-ui/RichText'
import PictureResponsiveNext from '@reachdigital/next-ui/PictureResponsiveNext'
import RowImageTextBoxed from '@reachdigital/next-ui/Row/RowImageTextBoxed'
import React from 'react'
import { ProductFeatureMediaBoxedFragment } from './ProductFeatureMediaBoxed.gql'
import { RowProductFeatureBoxedFragment } from './RowProductFeatureBoxed.gql'

type RowProductFeatureBoxedProps = RowProductFeatureBoxedFragment & ProductFeatureMediaBoxedFragment

export default function RowProductFeatureBoxedBoxed(props: RowProductFeatureBoxedProps) {
  const { copy, topic, media_gallery } = props
  const item = media_gallery?.[1] ?? media_gallery?.[0]

  if (!item) return null

  return (
    <RowImageTextBoxed
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
    </RowImageTextBoxed>
  )
}
