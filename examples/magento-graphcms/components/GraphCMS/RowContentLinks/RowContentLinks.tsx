import { ContentLinks } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import { RowContentLinksFragment } from './RowContentLinks.gql'

/** @deprecated Replace with RowLinks */
export function RowContentLinks(props: RowContentLinksFragment) {
  const { title: mainTitle, contentLinks } = props

  return (
    <ContentLinks title={mainTitle}>
      {contentLinks.map(({ id, url, title }) => (
        <Link key={id} href={url} variant='body1' underline='hover' sx={{ color: 'inherit' }}>
          {title}
        </Link>
      ))}
    </ContentLinks>
  )
}
