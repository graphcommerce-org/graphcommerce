import { Asset, RichText } from '@graphcommerce/graphcms-ui'
import { responsiveVal, VariantImageLabelSwiper } from '@graphcommerce/next-ui'
import { Box, ButtonBase, Typography } from '@mui/material'
import { RowLinksFragment } from '../RowLinks.gql'

export function ImageLabelSwiper(props: RowLinksFragment) {
  const { title, rowLinksCopy, pageLinks } = props

  return (
    <VariantImageLabelSwiper
      title={title}
      copy={rowLinksCopy && <RichText {...rowLinksCopy} />}
      sx={{ '& .Scroller-root': { alignItems: 'start' } }}
    >
      {pageLinks.map((pageLink) => (
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
    </VariantImageLabelSwiper>
  )
}
