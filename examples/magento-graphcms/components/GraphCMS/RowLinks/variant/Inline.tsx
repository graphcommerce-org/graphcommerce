import { VariantInline } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'

import { RowLinksFragment } from '../RowLinks.gql'

export function Inline(props: RowLinksFragment) {
  const { title, pageLinks } = props

  return (
    <VariantInline title={title} maxWidth={false} sx={(theme) => ({ my: theme.spacings.md })}>
      {pageLinks.map((pageLink) => (
        <Link href={pageLink.url} key={pageLink.id} underline='hover' sx={{ color: 'inherit' }}>
          {pageLink.title}
        </Link>
      ))}
    </VariantInline>
  )
}
