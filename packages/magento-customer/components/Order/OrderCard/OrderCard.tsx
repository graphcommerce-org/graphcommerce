import { Image } from '@graphcommerce/image'
import { Money } from '@graphcommerce/magento-store'
import {
  actionCardImageSizes,
  breakpointVal,
  DateTimeFormat,
  filterNonNullableKeys,
  iconChevronRight,
  IconSvg,
  NextLink,
  sxx,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/macro'
import type { SxProps, Theme } from '@mui/material'
import { Box, lighten, Paper, Skeleton } from '@mui/material'
import { OrderStateLabel } from '../OrderStateLabel/OrderStateLabel'
import type { OrderCardFragment } from './OrderCard.gql'

export type OrderCardProps = Partial<OrderCardFragment> & {
  loading?: boolean
  sx?: SxProps<Theme>
}

export function OrderCard(props: OrderCardProps) {
  const { number, total, items, order_date, loading, status = '', sx = [] } = props

  const totalItems = items?.length ?? 0
  const maxItemsToShow = totalItems <= 4 ? totalItems : 3

  const sizes = actionCardImageSizes.responsive

  const itemsWithImages = filterNonNullableKeys(items, ['product_url_key', 'product'])
    .map((item) => {
      const img = item.product.thumbnail
      if (!img?.url || img.url.includes('/placeholder/')) return null
      return { ...img, url: img.url }
    })
    .filter((v) => !!v)
    .filter((v) => !v.disabled)

  if (loading) {
    return (
      <Box sx={sx}>
        <Paper sx={(theme) => ({ p: theme.spacings.xs })}>
          <Box sx={{ display: 'grid', gap: 1 }}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Skeleton variant='rectangular' width={121} height={121} />
              <Box sx={{ flex: 1 }}>
                <Skeleton variant='text' width={140} height={32} />
                <Skeleton variant='text' width={100} height={24} />
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    )
  }

  return (
    <Box
      component={NextLink}
      href={`/account/orders/view?orderNumber=${number}`}
      sx={sxx(
        (theme) => ({
          display: 'flex',
          textDecoration: 'none',
          color: 'text.primary',
          px: theme.spacings.xxs,
          py: theme.spacings.xxs,
          gap: theme.spacings.sm,
          alignItems: 'flex-start',
          background:
            theme.palette.mode === 'light'
              ? theme.palette.background.default
              : lighten(theme.palette.background.default, 0.15),
          ...breakpointVal(
            'borderRadius',
            theme.shape.borderRadius * 2,
            theme.shape.borderRadius * 3,
            theme.breakpoints.values,
          ),
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
        }),
        sx,
      )}
    >
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: `repeat(2, calc(${sizes} / 2))`,
          gridTemplateRows: `repeat(2, calc(${sizes} / 2))`,
          gap: 1,
        }}
      >
        {itemsWithImages.slice(0, maxItemsToShow).map((item, index) => {
          const key = `${item.url}-${index}`
          return (
            <Image
              key={key}
              alt={item.label ?? ''}
              layout='fill'
              src={item.url}
              width={96}
              height={96}
              sx={{ borderRadius: 4, objectFit: 'contain' }}
              pictureProps={{
                sx: {
                  gridArea: itemsWithImages.length === 1 ? '1 / 1 / 3 / 3' : undefined,
                },
              }}
            />
          )
        })}

        {totalItems > 4 && (
          <Box
            sx={{
              bgcolor: 'background.paper',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 2,
              zIndex: 1,
              typography: 'body1',
              gridArea: '2 / 2 / 3 / 3',
            }}
          >
            +{totalItems - 3}
          </Box>
        )}
      </Box>

      <Box sx={{ flex: 1 }}>
        <Box sx={{ typography: 'subtitle1' }}>
          <DateTimeFormat date={order_date} dateStyle='long' />
        </Box>
        <Box sx={{ typography: 'body1', color: 'text.secondary' }}>#{number}</Box>
        <Box>
          <Trans id='Grand total'>Grand Total</Trans>: <Money {...total?.grand_total} />
        </Box>

        <Box>
          <Trans id='Status'>Status</Trans>:{' '}
          <OrderStateLabel {...props} status={status} sx={{ typography: 'body1' }} short />
        </Box>
      </Box>

      <IconSvg src={iconChevronRight} size='medium' sx={{ alignSelf: 'center' }} />
    </Box>
  )
}
