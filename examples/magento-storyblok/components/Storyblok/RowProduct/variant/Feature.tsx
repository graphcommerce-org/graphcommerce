import { Asset, RichText } from '@graphcommerce/storyblok-ui'
import { ImageText } from '@graphcommerce/next-ui'
import { Typography } from '@mui/material'
import type { RowProductVariantProps } from '../RowProduct'

export function Feature(props: RowProductVariantProps) {
  const { blok } = props

  return (
    <ImageText
      item={blok.asset?.filename ? <Asset asset={blok.asset} sizes='50vw' /> : undefined}
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
    </ImageText>
  )
}
