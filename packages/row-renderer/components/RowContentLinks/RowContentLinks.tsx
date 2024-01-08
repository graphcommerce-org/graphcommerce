import { ContentLinks } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import { RowContentLinksProps } from './type'

/** @deprecated Replace with RowLinks */
export function RowContentLinks(props: RowContentLinksProps) {
  const { title: mainTitle, links } = props

  return (
    <ContentLinks title={mainTitle}>
      {links.map(({ id, url, title }) => (
        <Link key={id} href={url} variant='body1' color='inherit' underline='hover'>
          {title}
        </Link>
      ))}
    </ContentLinks>
  )
}
