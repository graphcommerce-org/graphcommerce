import { ContentLinks } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import { RowContentLinksProps } from './input'

/** @deprecated Replace with RowLinks */
export function RowContentLinks(props: RowContentLinksProps) {
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
