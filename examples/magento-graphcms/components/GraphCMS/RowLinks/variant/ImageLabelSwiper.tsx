import { Asset, RichText } from '@graphcommerce/graphcms-ui'
import { responsiveVal, VariantImageLabelSwiper } from '@graphcommerce/next-ui'
import { Box, ButtonBase, Typography } from '@mui/material'
import { RowLinksProps } from '../type'

export function ImageLabelSwiper(props: RowLinksProps) {
  const { title, copy, links } = props

  return (
    <VariantImageLabelSwiper
      title={title}
      copy={copy && <RichText {...copy} />}
      sx={{ '& .Scroller-root': { alignItems: 'start' } }}
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
    </VariantImageLabelSwiper>
  )
}
