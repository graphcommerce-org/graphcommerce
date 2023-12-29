import { Box, SxProps, Theme } from '@mui/material'
import { IconSvg } from '../../../IconSvg'
import { iconCheckmark } from '../../../icons'
import { RichText } from '../../RichText'
import { Links } from '../Links'
import { RowLinksProps } from '../type'

export function Usps(props: RowLinksProps & { sx?: SxProps<Theme> }) {
  const { title, links, copy, sx = [], ...rowLinksProps } = props

  return (
    <Links
      {...rowLinksProps}
      title={title}
      maxWidth={false}
      showButtons='auto'
      inlineTitle
      copy={copy && <RichText {...copy} />}
      sx={[
        (theme) => ({
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
          '& .RowLinks-title': {
            display: 'none',
          },
          '& .Scroller-root': {
            margin: '0 auto',
            width: 'auto',
            maxWidth: 'fit-content',
            gap: theme.spacings.lg,
          },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {links.map((pageLink) => (
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
    </Links>
  )
}
