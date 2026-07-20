import { breakpointVal, HeroBanner } from '@graphcommerce/next-ui'
import type { AssetProps } from '@graphcommerce/storyblok-ui'
import {
  Asset,
  assetWithPoster,
  multilinkHref,
  RichText,
  storyblokEditable,
} from '@graphcommerce/storyblok-ui'
import { Button } from '@mui/material'
import type { StoryblokRowHeroBanner as RowHeroBannerBlok } from '../types'

export type RowHeroBannerProps = {
  blok: RowHeroBannerBlok
  /**
   * Only applies to an image asset — a video is never lazy-loaded. Pass
   * `'eager'` where the banner is the LCP element, via `RowRenderer`'s
   * `renderer`.
   */
  loading?: AssetProps['loading']
}

export function RowHeroBanner({ blok, loading }: RowHeroBannerProps) {
  const { asset, poster } = assetWithPoster(blok.asset)

  return (
    <HeroBanner
      {...storyblokEditable(blok)}
      pageLinks={blok.page_links?.map((link) => (
        <Button
          key={link._uid}
          href={multilinkHref(link.url)}
          variant='outlined'
          size='large'
          color='inherit'
        >
          {link.title}
        </Button>
      ))}
      asset={asset && <Asset asset={asset} poster={poster} loading={loading} />}
      sx={(theme) => ({
        '& .HeroBanner-copy': {
          minHeight: { xs: 'min(70vh,600px)', md: 'min(70vh,1080px)' },
          [theme.breakpoints.up('sm')]: {
            padding: theme.spacings.xl,
            justifyItems: 'start',
            alignContent: 'center',
            textAlign: 'left',
            width: '50%',
          },
        },
      })}
    >
      {blok.copy && (
        <RichText
          content={blok.copy}
          sxRenderer={{
            paragraph: { typography: 'overline' },
            h1: (theme) => ({
              textTransform: 'uppercase',
              mt: 1,
              mb: theme.spacings.sm,
              ...breakpointVal('fontSize', 36, 82, theme.breakpoints.values),
            }),
            bold: {
              WebkitTextFillColor: 'transparent',
              WebkitTextStroke: '1.2px #fff',
            },
          }}
        />
      )}
    </HeroBanner>
  )
}
