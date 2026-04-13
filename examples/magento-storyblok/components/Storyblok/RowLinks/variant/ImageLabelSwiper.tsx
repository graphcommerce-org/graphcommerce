import { responsiveVal, VariantImageLabelSwiper } from '@graphcommerce/next-ui'
import { Asset, RichText } from '@graphcommerce/storyblok-ui'
import { storyblokEditable, type SbBlokData } from '@storyblok/react'
import { Box, ButtonBase, Typography } from '@mui/material'
import type { RowLinksVariantProps } from '../RowLinks'

export function ImageLabelSwiper(props: RowLinksVariantProps) {
  const { title, copy, page_links } = props

  return (
    <VariantImageLabelSwiper
      title={title ?? ''}
      copy={copy ? <RichText content={copy} /> : undefined}
      sx={{ '& .Scroller-root': { alignItems: 'start' } }}
    >
      {page_links?.map((pageLink) => (
        <ButtonBase
          {...storyblokEditable(pageLink as unknown as SbBlokData)}
          href={pageLink.url ?? ''}
          // eslint-disable-next-line no-underscore-dangle
          key={pageLink._uid}
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            rowGap: theme.spacings.xs,
            '& img, & video': { display: 'block' },
          })}
        >
          {pageLink.asset && (
            <Asset
              asset={pageLink.asset}
              sx={{
                width: responsiveVal(260, 400),
                maxWidth: responsiveVal(260, 400),
                borderRadius: 3,
              }}
              sizes={responsiveVal(260, 400)}
            />
          )}
          <Box sx={{ maxWidth: responsiveVal(260, 400) }}>
            <Typography variant='h6' component='h3'>
              {pageLink.title}
            </Typography>
            {pageLink.description && <RichText content={pageLink.description} />}
          </Box>
        </ButtonBase>
      ))}
    </VariantImageLabelSwiper>
  )
}
