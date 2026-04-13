import { VariantInline } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import type { RowLinksVariantProps } from '../RowLinks'

export function Inline(props: RowLinksVariantProps) {
  const { title, page_links } = props

  return (
    <VariantInline title={title} maxWidth={false}>
      {page_links?.map((pageLink) => (
        // eslint-disable-next-line no-underscore-dangle
        <Link href={pageLink.url ?? ''} key={pageLink._uid} color='inherit' underline='hover'>
          {pageLink.title}
        </Link>
      ))}
    </VariantInline>
  )
}
