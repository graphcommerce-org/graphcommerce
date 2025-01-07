import { RichText } from '@graphcommerce/hygraph-ui'
import { Image } from '@graphcommerce/image'
import { ImageText, useContainerSpacing } from '@graphcommerce/next-ui'
import { Typography, useTheme } from '@mui/material'
import { RowProductFragment } from '../RowProduct.gql'
import { ProductFeatureMediaFragment } from './ProductFeatureMedia.gql'

type FeatureProps = RowProductFragment & ProductFeatureMediaFragment

export function Feature(props: FeatureProps) {
  const { productCopy, title, media_gallery } = props
  const theme = useTheme()
  const item = media_gallery?.[2] ?? media_gallery?.[0]
  const { size, breakpoint } = useContainerSpacing({ sizing: 'content' })

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
            sizes={{
              0: '100vw',
              [theme.breakpoints.values.md]: '50vw',
              ...(breakpoint && {
                [theme.breakpoints.values[breakpoint]]: `calc(${size} / 2)` as const,
              }),
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
