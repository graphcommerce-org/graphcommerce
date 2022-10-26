import { RichText } from '@graphcommerce/graphcms-ui'
import { breakpointVal, HeroBanner } from '@graphcommerce/next-ui'
import { Button } from '@mui/material'
import PageLink from 'next/link'
import { RowHeroBannerFragment } from './RowHeroBanner.gql'

export function RowHeroBanner(props: RowHeroBannerFragment) {
  const { copy, heroAsset, pageLinks } = props

  return (
    <HeroBanner
      pageLinks={pageLinks.map((pageLink) => (
        <PageLink key={pageLink.url} href={pageLink.url} passHref legacyBehavior>
          <Button variant='outlined' size='large' color='inherit'>
            {pageLink.title}
          </Button>
        </PageLink>
      ))}
      videoSrc={heroAsset.url}
    >
      <RichText
        {...copy}
        sxRenderer={{
          'heading-one': (theme) => ({
            textTransform: 'uppercase' as const,
            maxWidth: '70%',
            textAlign: 'center' as const,
            margin: 0,
            marginBottom: theme.spacings.md,
            ...breakpointVal('fontSize', 36, 82, theme.breakpoints.values),
            [theme.breakpoints.up('md')]: {
              textAlign: 'left',
              maxWidth: '100%',
            },
            '& strong': {
              WebkitTextFillColor: 'transparent',
              WebkitTextStroke: `1.2px #fff`,
            },
          }),
        }}
      />
    </HeroBanner>
  )
}
