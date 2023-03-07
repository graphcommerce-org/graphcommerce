import { Asset, RichText } from '@graphcommerce/graphcms-ui'
import { NextLink, responsiveVal, VariantImageLabelSwiper } from '@graphcommerce/next-ui'
import { Box, ButtonBase, Typography } from '@mui/material'
import { RowLinksFragment } from '../RowLinks.gql'

export function ImageLabelSwiper(props: RowLinksFragment) {
  const { title, pageLinks } = props

  return (
    <VariantImageLabelSwiper title={title}>
      {pageLinks.map((pageLink) => (
        <ButtonBase
          component={NextLink}
          key={pageLink.id}
          href={pageLink.url}
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            rowGap: theme.spacings.xs,
          })}
        >
          {pageLink?.asset && (
            <Asset
              asset={pageLink.asset}
              sx={{
                width: responsiveVal(120, 200),
                maxWidth: responsiveVal(120, 200),
              }}
              sizes={responsiveVal(120, 200)}
            />
          )}
          <Box sx={{ maxWidth: responsiveVal(120, 200) }}>
            <Typography variant='h6' component='h3'>
              {pageLink.title}
            </Typography>
            {pageLink?.description && (
              <RichText
                {...pageLink.description}
                sxRenderer={{
                  paragraph: {
                    textAlign: 'center' as const,
                  },
                }}
              />
            )}
          </Box>
        </ButtonBase>
      ))}
    </VariantImageLabelSwiper>
  )
}
