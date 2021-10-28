import RichText from '@graphcommerce/graphcms-ui/RichText'
import { Image } from '@graphcommerce/image'
import { RowImageTextBoxed } from '@graphcommerce/next-ui'
import { Typography, useTheme, withStyles, Theme } from '@material-ui/core'
import React from 'react'
import { RowProductFragment } from '../RowProduct.gql'
import { ProductFeatureMediaBoxedFragment } from './ProductFeatureMediaBoxed.gql'

type FeatureBoxedProps = RowProductFragment & ProductFeatureMediaBoxedFragment

const RichTextFeatureBoxed = withStyles((theme: Theme) => ({
  h2: { ...theme.typography.h1 },
  paragraph: { ...theme.typography.subtitle1 },
}))(RichText)

export default function FeatureBoxed(props: FeatureBoxedProps) {
  const { productCopy, title, media_gallery } = props
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
            width={1532}
            height={1678}
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
      {productCopy?.raw && <RichTextFeatureBoxed {...productCopy} />}
    </RowImageTextBoxed>
  )
}
