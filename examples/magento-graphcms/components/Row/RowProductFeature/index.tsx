import { Typography, useTheme } from '@material-ui/core'
import RichText from '@graphcommerce/graphcms-ui/RichText'
import { Image } from '@graphcommerce/image'
import { RowImageText } from '@graphcommerce/next-ui'
import React from 'react'
import { ProductFeatureMediaFragment } from './ProductFeatureMedia.gql'
import { RowProductFeatureFragment } from './RowProductFeature.gql'

type ProductFeatureProps = RowProductFeatureFragment & ProductFeatureMediaFragment

export default function RowProductFeature(props: ProductFeatureProps) {
  const { copy, topic, media_gallery } = props
  const item = media_gallery?.[2] ?? media_gallery?.[0]

  const theme = useTheme()
  if (!item) return null

  return (
    <RowImageText
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
      {topic && <Typography variant='overline'>{topic}</Typography>}
      <RichText {...copy} />
    </RowImageText>
  )
}
