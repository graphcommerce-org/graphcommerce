import { VariantInline } from '@graphcommerce/next-ui'
import { Link } from '@mui/material'

type RowLinksProps = {
  __typename: string
  id: string
  title: string
  linksVariant?: 'Inline' | 'ImageLabelSwiper' | 'LogoSwiper' | 'Usps' | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rowLinksCopy?: { raw: any } | null
  pageLinks: Array<{
    id: string
    title: string
    url: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    description?: { raw: any } | null
    asset?: {
      url: string
      width?: number | null
      height?: number | null
      mimeType?: string | null
      size?: number | null
      alt?: string | null
    } | null
  }>
}

export function Inline(props: RowLinksProps) {
  const { title, pageLinks } = props

  return (
    <VariantInline title={title} maxWidth={false} sx={(theme) => ({ my: theme.spacings.md })}>
      {pageLinks.map((pageLink) => (
        <Link href={pageLink.url} key={pageLink.id} color='inherit' underline='hover'>
          {pageLink.title}
        </Link>
      ))}
    </VariantInline>
  )
}
