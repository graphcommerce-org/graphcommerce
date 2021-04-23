import { Link } from '@material-ui/core'
import ContentLinks from '@reachdigital/next-ui/row/ContentLinks'
import PageLink from 'next/link'
import React from 'react'
import { RowContentLinksFragment } from './RowContentLinks.gql'

type RowContentLinksProps = RowContentLinksFragment

export default function RowContentLinks(props: RowContentLinksProps) {
  const { title, contentLinks } = props

  return (
    <ContentLinks title={title}>
      {contentLinks.map((contentLink) => (
        <PageLink href={contentLink.url} key={contentLink.url} passHref>
          <Link key={contentLink.url} href={contentLink.url} variant='body1' color='inherit'>
            {contentLink.title}
          </Link>
        </PageLink>
      ))}
    </ContentLinks>
  )
}
