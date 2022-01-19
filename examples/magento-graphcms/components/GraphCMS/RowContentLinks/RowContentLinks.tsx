import { ContentLinks } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import PageLink from 'next/link'
import { RowContentLinksFragment } from './RowContentLinks.gql'

export function RowContentLinks(props: RowContentLinksFragment) {
  const { title, contentLinks } = props

  return (
    <ContentLinks title={title}>
      {contentLinks.map((contentLink) => (
        <PageLink href={contentLink.url} key={contentLink.url} passHref>
          <Link
            key={contentLink.url}
            href={contentLink.url}
            variant='body1'
            color='inherit'
            underline='hover'
          >
            {contentLink.title}
          </Link>
        </PageLink>
      ))}
    </ContentLinks>
  )
}
