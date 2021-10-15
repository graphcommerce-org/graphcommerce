import RichText from '@graphcommerce/graphcms-ui/RichText'
import { Image } from '@graphcommerce/image'
import { RowImageText } from '@graphcommerce/next-ui'
import { Typography, useTheme } from '@material-ui/core'
import React from 'react'
import { RowProductFragment } from '../RowProduct.gql'
import { ProductFeatureMediaFragment } from './ProductFeatureMedia.gql'

type FeatureProps = RowProductFragment & ProductFeatureMediaFragment

export default function Feature(props: FeatureProps) {
  const { productCopy, title, media_gallery } = props
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
      {title && <Typography variant='overline'>{title}</Typography>}
      {productCopy?.raw && <RichText {...productCopy} />}
    </RowImageText>
  )
}
