import { Image } from '@graphcommerce/image'
import { ImageTextBoxed, responsiveVal } from '@graphcommerce/next-ui'
import { Asset, assetWithPoster, RichText } from '@graphcommerce/storyblok-ui'
import { Typography, useTheme } from '@mui/material'
import type { RowPdpVariantProps } from '../../RowPdp'

export function FeatureBoxed(props: RowPdpVariantProps) {
  const { blok, media_gallery } = props
  const theme = useTheme()
  const item = media_gallery?.[1] ?? media_gallery?.[0]
  const { asset, poster } = assetWithPoster(blok.asset)

  return (
    <ImageTextBoxed
      item={
        asset ? (
          <Asset asset={asset} poster={poster} sizes='50vw' />
        ) : item?.__typename === 'ProductImage' && item.url ? (
          <Image
            alt={item.label ?? 'Product Image'}
            width={1532}
            height={1678}
            src={item.url}
            sizes={{
              0: '100vw',
              [theme.breakpoints.values.md]: responsiveVal(100, 600),
            }}
          />
        ) : undefined
      }
    >
      {blok.title && (
        <Typography variant='overline' color='textSecondary'>
          {blok.title}
        </Typography>
      )}
      {blok.product_copy && (
        <RichText
          content={blok.product_copy}
          sxRenderer={{
            h2: { typography: 'h1' },
            paragraph: { typography: 'subtitle1' },
          }}
        />
      )}
    </ImageTextBoxed>
  )
}
