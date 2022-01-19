import { RichTextHero } from '@graphcommerce/graphcms-ui'
import { HeroBanner } from '@graphcommerce/next-ui'
import { Button } from '@mui/material'
import PageLink from 'next/link'
import { RowHeroBannerFragment } from './RowHeroBanner.gql'

export function RowHeroBanner(props: RowHeroBannerFragment) {
  const { copy, heroAsset, pageLinks } = props

  return (
    <HeroBanner
      pageLinks={pageLinks.map((pageLink) => (
        <PageLink key={pageLink.url} href={pageLink.url} passHref>
          <Button variant='outlined' size='large' color='inherit'>
            {pageLink.title}
          </Button>
        </PageLink>
      ))}
      videoSrc={heroAsset.url}
    >
      <RichTextHero {...copy} />
    </HeroBanner>
  )
}
