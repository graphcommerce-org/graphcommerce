import { VariantInline } from '@graphcommerce/next-ui'
import { multilinkHref, storyblokEditable } from '@graphcommerce/storyblok-ui'
import { Link } from '@mui/material'
import type { RowLinksVariantProps } from '../RowLinks'

export function Inline(props: RowLinksVariantProps) {
  const { title, page_links } = props

  return (
    <VariantInline title={title ?? ''} maxWidth={false}>
      {page_links?.map((pageLink) => (
        <Link
          {...storyblokEditable(pageLink)}
          href={multilinkHref(pageLink.url)}
          key={pageLink._uid}
          color='inherit'
          underline='hover'
        >
          {pageLink.title}
        </Link>
      ))}
    </VariantInline>
  )
}
