import RichText from '@graphcommerce/graphcms-ui/RichText'
import { Image } from '@graphcommerce/image'
import { ImageText, withStyles } from '@graphcommerce/next-ui'
import { Typography, useTheme } from '@mui/material'
import React from 'react'
import { RowProductFragment } from '../RowProduct.gql'
import { ProductFeatureMediaFragment } from './ProductFeatureMedia.gql'

type FeatureProps = RowProductFragment & ProductFeatureMediaFragment

const RichTextFeature = withStyles(RichText, (theme) => ({
  h2: { ...theme.typography.h1 },
  paragraph: { ...theme.typography.subtitle1 },
}))

export default function Feature(props: FeatureProps) {
  const { productCopy, title, media_gallery } = props
  const theme = useTheme()
  const item = media_gallery?.[2] ?? media_gallery?.[0]

  if (!item) return null

  return (
    <ImageText
      item={
        item.__typename === 'ProductImage' &&
        item.url && (
          <Image
            alt={item.label ?? ''}
            width={1532}
            height={1678}
            src={item.url}
            layout='fill'
            sizes={{
              0: '100vw',
              [theme.breakpoints.values.md]: '50vw',
            }}
          />
        )
      }
    >
      {title && (
        <Typography variant='overline' color='textSecondary'>
          {title}
        </Typography>
      )}
      {productCopy?.raw && <RichTextFeature {...productCopy} />}
    </ImageText>
  )
}
