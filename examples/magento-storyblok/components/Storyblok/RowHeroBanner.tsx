import { breakpointVal, HeroBanner } from '@graphcommerce/next-ui'
import { RichText } from '@graphcommerce/storyblok-ui'
import { Button } from '@mui/material'
import { storyblokEditable, type SbBlokData } from '@storyblok/react'
import type { StoryblokRowHeroBanner as RowHeroBannerBlok } from '../../.storyblok/types/291439709879423/storyblok-components'

export function RowHeroBanner({ blok }: { blok: RowHeroBannerBlok }) {
  return (
    <HeroBanner
      {...storyblokEditable(blok as unknown as SbBlokData)}
      pageLinks={blok.page_links?.map((link) => (
        // eslint-disable-next-line no-underscore-dangle
        <Button
          key={link._uid}
          href={link.url ?? ''}
          variant='outlined'
          size='large'
          color='inherit'
        >
          {link.title}
        </Button>
      ))}
      videoSrc={blok.asset?.filename ?? ''}
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
            strong: {
              WebkitTextFillColor: 'transparent',
              WebkitTextStroke: '1.2px #fff',
            },
          }}
        />
      )}
    </HeroBanner>
  )
}
