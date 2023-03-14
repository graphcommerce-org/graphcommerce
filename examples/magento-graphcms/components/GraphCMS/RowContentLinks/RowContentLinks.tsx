import { ContentLinks } from '@graphcommerce/next-ui'
import Link from '@mui/material/Link'
import { RowContentLinksFragment } from './RowContentLinks.gql'

export function RowContentLinks(props: RowContentLinksFragment) {
  const { title: mainTitle, contentLinks } = props

  return (
    <ContentLinks title={mainTitle}>
      {contentLinks.map(({ id, url, title }) => (
        <Link key={id} href={url} variant='body1' color='inherit' underline='hover'>
          {title}
        </Link>
      ))}
    </ContentLinks>
  )
}
