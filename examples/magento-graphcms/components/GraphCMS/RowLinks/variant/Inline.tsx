import { NextLink, VariantInline } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'

import { RowLinksFragment } from '../RowLinks.gql'

export function Inline(props: RowLinksFragment) {
  const { title, pageLinks } = props

  return (
    <VariantInline title={title}>
      {pageLinks.map((pageLink) => (
        <Link
          component={NextLink}
          href={pageLink.url}
          key={pageLink.id}
          color='inherit'
          underline='hover'
        >
          {pageLink.title}
        </Link>
      ))}
    </VariantInline>
  )
}
