import { Typography, useTheme } from '@material-ui/core'
import RichText from '@reachdigital/graphcms-ui/RichText'
import { Image } from '@reachdigital/image'
import { RowImageTextBoxed } from '@reachdigital/next-ui'
import React from 'react'
import { ProductFeatureMediaBoxedFragment } from './ProductFeatureMediaBoxed.gql'
import { RowProductFeatureBoxedFragment } from './RowProductFeatureBoxed.gql'

type RowProductFeatureBoxedProps = RowProductFeatureBoxedFragment & ProductFeatureMediaBoxedFragment

export default function RowProductFeatureBoxedBoxed(props: RowProductFeatureBoxedProps) {
  const { copy, topic, media_gallery } = props
  const item = media_gallery?.[1] ?? media_gallery?.[0]
  const theme = useTheme()

  if (!item) return null

  return (
    <RowImageTextBoxed
      item={
        item.__typename === 'ProductImage' &&
        item.url && (
          <Image
            alt={item.label ?? ''}
            width={328}
            height={328}
            src={item.url}
            sizes={{
              0: '100vw',
              [theme.breakpoints.values.md]: '50vw',
            }}
          />
        )
      }
    >
      {topic && <Typography variant='captionOldOld'>{topic}</Typography>}
      <RichText {...copy} />
    </RowImageTextBoxed>
  )
}
