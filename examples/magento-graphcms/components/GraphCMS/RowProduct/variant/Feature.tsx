import { RichText } from '@graphcommerce/graphcms-ui'
import { Image } from '@graphcommerce/image'
import { ProductListItemRenderer } from '@graphcommerce/magento-product'
import { ImageText } from '@graphcommerce/next-ui'
import { Typography, useTheme } from '@mui/material'
import { RowProductFragment } from '../RowProduct.gql'

type FeatureProps = RowProductFragment & { productListItemRenderer: ProductListItemRenderer }

export function Feature(props: FeatureProps) {
  const { productCopy, title, category } = props
  const theme = useTheme()
  const firstProduct = category?.products?.items?.[0]
  const item = firstProduct?.small_image

  if (!item) return null

  return (
    <ImageText
      item={
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
