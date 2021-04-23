import RichText from '@reachdigital/graphcms-ui/RichText'
import HeroBanner from '@reachdigital/next-ui/Row/HeroBanner'
import React from 'react'
import Button from '../PageLink/Button'
import { RowHeroBannerFragment } from './RowHeroBanner.gql'

export default function RowHeroBanner(props: RowHeroBannerFragment) {
  const { copy, asset, pageLinks } = props

  return (
    <HeroBanner
      RichContent={(richTextOneClasses) => <RichText {...richTextOneClasses} {...copy} />}
      pageLinks={pageLinks.map((pageLink) => (
        <Button key={pageLink.url} {...pageLink} variant='outlined' size='large' color='inherit' />
      ))}
      videoSrc={asset.url}
    />
  )
}
