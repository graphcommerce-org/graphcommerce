import { RichText } from '@graphcommerce/graphcms-ui'
import { breakpointVal, HeroBanner } from '@graphcommerce/next-ui'
import { Button } from '@mui/material'
import { RowHeroBannerFragment } from './RowHeroBanner.gql'

export function RowHeroBanner(props: RowHeroBannerFragment) {
  const { copy, heroAsset, pageLinks } = props

  return (
    <HeroBanner
      pageLinks={pageLinks.map(({ url, title }) => (
        <Button key={url} href={url} variant='outlined' size='large' color='inherit'>
          {title}
        </Button>
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
