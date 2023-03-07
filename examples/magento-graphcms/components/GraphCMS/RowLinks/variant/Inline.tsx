import { NextLink, RowLink, VariantInline } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'

import { RowLinksFragment } from '../RowLinks.gql'

export function Inline(props: RowLinksFragment) {
  const { title, pageLinks } = props

  return (
    <VariantInline title={title}>
      {pageLinks.map((pageLink) => (
        <RowLink
          url={pageLink.url}
          key={pageLink.id}
          color='inherit'
          disableRipple
          sx={{ '&:hover': { textDecoration: 'underline' } }}
        >
          {pageLink.title}
        </RowLink>
      ))}
    </VariantInline>
  )
}
