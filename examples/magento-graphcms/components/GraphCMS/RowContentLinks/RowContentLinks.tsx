import { ContentLinks, Link } from '@graphcommerce/next-ui'
import { RowContentLinksFragment } from './RowContentLinks.gql'

export function RowContentLinks(props: RowContentLinksFragment) {
  const { title, contentLinks } = props

  return (
    <ContentLinks title={title}>
      {contentLinks.map((contentLink) => (
        <Link
          key={contentLink.id}
          href={contentLink.url}
          variant='body1'
          color='inherit'
          underline='hover'
        >
          {contentLink.title}
        </Link>
      ))}
    </ContentLinks>
  )
}
