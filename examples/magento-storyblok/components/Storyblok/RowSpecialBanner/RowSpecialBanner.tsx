import { breakpointVal, SpecialBanner } from '@graphcommerce/next-ui'
import { Asset, RichText } from '@graphcommerce/storyblok-ui'
import { storyblokEditable, type SbBlokData } from '@storyblok/react'
import { Link } from '@mui/material'
import type { StoryblokRowSpecialBanner as RowSpecialBannerBlok } from '../types'

export function RowSpecialBanner({ blok }: { blok: RowSpecialBannerBlok }) {
  return (
    <SpecialBanner
      {...storyblokEditable(blok as unknown as SbBlokData)}
      topic={blok.topic}
      asset={blok.asset?.filename ? <Asset asset={blok.asset} sizes='50vw' /> : undefined}
      pageLinks={blok.page_links?.map((link) => (
        <Link
          {...storyblokEditable(link as unknown as SbBlokData)}
          underline='always'
          href={link.url ?? ''}
          key={link._uid}
          color='inherit'
        >
          {link.title}
        </Link>
      ))}
    >
      {blok.copy && (
        <RichText
          content={blok.copy}
          sxRenderer={{
            h2: (theme) => ({
              textTransform: 'uppercase',
              color: 'text.primary',
              ...breakpointVal('fontSize', 36, 65, theme.breakpoints.values),
              marginBottom: 0,
              '& strong': {
                color: 'background.default',
                textShadow: `1.2px 0 0 ${theme.vars.palette.text.primary},0 1.2px 0 ${theme.vars.palette.text.primary},-1.2px 0 0 ${theme.vars.palette.text.primary},0 -1.2px 0 ${theme.vars.palette.text.primary}`,
              },
            }),
          }}
        />
      )}
    </SpecialBanner>
  )
}
