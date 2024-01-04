import { responsiveVal, Links, Asset, RichText } from '@graphcommerce/next-ui'
import { Box, ButtonBase, SxProps, Theme, Typography } from '@mui/material'
import { RowLinksProps } from '../type'

export function ImageLabelSwiper(props: RowLinksProps & { sx?: SxProps<Theme> }) {
  const { title, copy, links, sx = [], ...rowLinksProps } = props

  return (
    <Links
      {...rowLinksProps}
      title={title}
      maxWidth={false}
      showButtons='auto'
      copy={copy && <RichText {...copy} />}
      sx={[
        {
          '& .Scroller-root': {
            alignItems: 'start',
          },
          '& .RowLinks-title': {
            typography: 'h5',
            textTransform: 'uppercase',
          },
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {links.map((pageLink) => (
        <ButtonBase
          href={pageLink.url}
          key={pageLink.id}
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            rowGap: theme.spacings.xs,
            '& img': { display: 'block' },
          })}
        >
          {pageLink?.asset && (
            <Asset
              asset={pageLink.asset}
              sx={{
                width: responsiveVal(120, 200),
                maxWidth: responsiveVal(120, 200),
              }}
              sizes={responsiveVal(260, 400)}
            />
          )}
          <Box sx={{ maxWidth: responsiveVal(120, 200) }}>
            <Typography variant='h6' component='h3'>
              {pageLink.title}
            </Typography>
            {pageLink?.description && <RichText {...pageLink.description} />}
          </Box>
        </ButtonBase>
      ))}
    </Links>
  )
}
