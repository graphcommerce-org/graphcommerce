import { Image } from '@graphcommerce/image'
import { ImageText } from '@graphcommerce/next-ui'
import { Typography, useTheme } from '@mui/material'
import { RowProductFragment } from '../RowProduct.gql'
import { ProductFeatureMediaFragment } from './ProductFeatureMedia.gql'
import { RichText } from '../../RichText'
import { ProductListItemRenderer } from '@graphcommerce/magento-product'

type FeatureProps = RowProductFragment & { productListItemRenderer: ProductListItemRenderer }

export function Feature(props: FeatureProps) {
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
            alt={item.label || item.label === ' ' ? item.label : 'Product Image 2'}
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
      {productCopy?.raw && (
        <RichText
          {...productCopy}
          sxRenderer={{
            'heading-two': { typography: 'h1' },
            paragraph: { typography: 'subtitle1' },
          }}
          withMargin
        />
      )}
    </ImageText>
  )
}
