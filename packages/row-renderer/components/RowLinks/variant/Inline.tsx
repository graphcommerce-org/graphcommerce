import { Links, RichText } from '@graphcommerce/next-ui'
import { Link, SxProps, Theme } from '@mui/material'
import { RowLinksProps } from '../type'

export function Inline(props: RowLinksProps & { sx?: SxProps<Theme> }) {
  const { title, links, copy, sx = [], ...rowLinksProps } = props

  return (
    <Links
      title={title}
      maxWidth={false}
      showButtons='auto'
      sx={[
        (theme) => ({
          marginY: theme.spacings.md,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      inlineTitle
      copy={copy && <RichText {...copy} />}
      {...rowLinksProps}
    >
      {links.map((pageLink) => (
        <Link href={pageLink.url} key={pageLink.id} color='inherit' underline='hover'>
          {pageLink.title}
        </Link>
      ))}
    </Links>
  )
}
