import { Image } from '@graphcommerce/image'
import { ImageText, responsiveVal, useContainerSpacing } from '@graphcommerce/next-ui'
import { Asset, RichText } from '@graphcommerce/storyblok-ui'
import { Typography, useTheme } from '@mui/material'
import type { RowProductVariantProps } from '../../RowProduct'

export function Feature(props: RowProductVariantProps) {
  const { blok, media_gallery } = props
  const theme = useTheme()
  const item = media_gallery?.[2] ?? media_gallery?.[0]
  const { size, breakpoint } = useContainerSpacing({ sizing: 'content' })

  return (
    <ImageText
      item={
        blok.asset?.filename ? (
          <Asset asset={blok.asset} sizes={responsiveVal(100, 600)} />
        ) : item?.__typename === 'ProductImage' && item.url ? (
          <Image
            alt={item.label ?? 'Product Image'}
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
    </ImageText>
  )
}
