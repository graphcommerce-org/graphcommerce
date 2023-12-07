import { RichText } from '@graphcommerce/graphcms-ui'
import { iconCheckmark, IconSvg, VariantUsps } from '@graphcommerce/next-ui'
import { Box } from '@mui/material'

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

export function Usps(props: RowLinksProps) {
  const { title, pageLinks } = props

  return (
    <VariantUsps
      title={title}
      maxWidth={false}
      sx={(theme) => ({
        '& .Scroller-root > *': {
          [theme.breakpoints.only('xs')]: {
            '&:nth-last-of-type(-n+3)': {
              display: 'none',
            },
          },
          [theme.breakpoints.only('sm')]: {
            '&:nth-last-of-type(-n+2)': {
              display: 'none',
            },
          },
          [theme.breakpoints.only('md')]: {
            '&:nth-last-of-type(-n+1)': {
              display: 'none',
            },
          },
        },
      })}
    >
      {pageLinks.map((pageLink) => (
        <Box
          key={pageLink.id}
          sx={{
            display: 'inline-flex',
            flexWrap: 'nowrap',
            gap: 1,
            alignItems: 'center',
          }}
        >
          <IconSvg src={iconCheckmark} sx={{ color: 'primary.main' }} />
          <Box>
            {pageLink.title}{' '}
            {pageLink?.description && (
              <RichText
                {...pageLink.description}
                sxRenderer={{
                  paragraph: {
                    display: 'inline',
                  },
                  link: {
                    color: 'text.primary',
                    textDecoration: 'underline',
                  },
                }}
              />
            )}
          </Box>
        </Box>
      ))}
    </VariantUsps>
  )
}
