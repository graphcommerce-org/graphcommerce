import RichTextHeadingStrongStroked from '@graphcommerce/graphcms-ui/RichText/RichTextHeadingStrongStroked'
import { SpecialBanner } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import PageLink from 'next/link'
import React from 'react'
import Asset from '../../Asset'
import { RowSpecialBannerFragment } from './RowSpecialBanner.gql'

type RowSpecialBannerProps = RowSpecialBannerFragment

export default function RowSpecialBanner(props: RowSpecialBannerProps) {
  const { copy, asset, topic, pageLinks } = props

  return (
    <SpecialBanner
      topic={topic}
      asset={<Asset asset={asset} sizes='50vw' />}
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
