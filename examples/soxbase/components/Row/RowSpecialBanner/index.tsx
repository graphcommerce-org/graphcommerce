import { Link } from '@material-ui/core'
import RichTextHeadingStrongStroked from '@reachdigital/graphcms-ui/RichText/RichTextHeadingStrongStroked'
import { SpecialBanner } from '@reachdigital/next-ui'
import PageLink from 'next/link'
import React from 'react'
import Asset from '../Asset'
import { RowSpecialBannerFragment } from './RowSpecialBanner.gql'

type RowSpecialBannerProps = RowSpecialBannerFragment

export default function RowSpecialBanner(props: RowSpecialBannerProps) {
  const { copy, asset, topic, pageLinks } = props

  return (
    <SpecialBanner
      topic={topic}
      asset={<Asset asset={asset} />}
      pageLinks={pageLinks.map((pageLink) => (
        <PageLink href={pageLink.url} key={pageLink.url}>
          <Link underline='always' href={pageLink.url} title={pageLink.title}>
            {pageLink.title}
          </Link>
        </PageLink>
      ))}
    >
      <RichTextHeadingStrongStroked {...copy} />
    </SpecialBanner>
  )
}
