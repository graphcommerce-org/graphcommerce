import RichTextHero from '@graphcommerce/graphcms-ui/RichText/RichTextHero'
import { Button, HeroBanner } from '@graphcommerce/next-ui'
import PageLink from 'next/link'
import React from 'react'
import { RowHeroBannerFragment } from './RowHeroBanner.gql'

export default function RowHeroBanner(props: RowHeroBannerFragment) {
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
      videoSrc={'/vid.mp4'}
    >
      <RichTextHero {...copy} />
    </HeroBanner>
  )
}
