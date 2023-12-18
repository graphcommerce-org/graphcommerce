import { VariantInline } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'
import { RowLinksProps } from '../type'

export function Inline(props: RowLinksProps) {
  const { title, links } = props

  return (
    <VariantInline title={title} maxWidth={false} sx={(theme) => ({ my: theme.spacings.md })}>
      {links.map((pageLink) => (
        <Link href={pageLink.url} key={pageLink.id} color='inherit' underline='hover'>
          {pageLink.title}
        </Link>
      ))}
    </VariantInline>
  )
}
