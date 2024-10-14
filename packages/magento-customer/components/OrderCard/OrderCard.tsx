import { Money } from '@graphcommerce/magento-store'
import { DateTimeFormat, extendableComponent, NextLink } from '@graphcommerce/next-ui'
import { Box, styled, SxProps, Theme, Skeleton, ListItemButton } from '@mui/material'
import { UseOrderCardItemImages } from '../../hooks/useOrderCardItemImages'
import { OrderCardItemImage } from '../OrderCardItemImage/OrderCardItemImage'
import { OrderStateLabel } from '../OrderStateLabel/OrderStateLabel'
import { TrackingLink } from '../TrackingLink/TrackingLink'
import { OrderCardFragment } from './OrderCard.gql'

type OrderCardProps = Partial<OrderCardFragment> & {
  loading?: boolean
  images?: UseOrderCardItemImages
  sx?: SxProps<Theme>
}

const componentName = 'OrderCard'
const parts = [
  'orderContainer',
  'orderRow',
  'orderMoney',
  'orderProducts',
  'images',
  'placeholder',
  'buttonRoot',
  'tracking',
] as const
const { classes } = extendableComponent(componentName, parts)

const OrderContainer = styled(Box, { name: componentName, target: classes.orderContainer })(
  ({ theme }) => ({
    padding: theme.spacings.sm,
    display: 'grid',
    justifyContent: 'center',
    width: '100%',
  }),
)

const OrderRow = styled(Box, { name: componentName, target: classes.orderRow })(({ theme }) => ({
  margin: `0 auto calc(${theme.spacings.xxs} * .5) auto`,
  display: 'flex',
  gap: theme.spacings.xxs,
}))

export function OrderCard(props: OrderCardProps) {
  const {
    number,
    shipments,
    total,
    items,
    order_date,
    images,
    loading,
    status = '',
    sx = [],
  } = props

  const totalItems = items?.length ?? 0
  const maxItemsInRow = 5

  if (loading) {
    return (
      <Box sx={sx}>
        <OrderContainer className={classes.orderContainer}>
          <OrderRow>
            <Skeleton variant='text' width={192} />
          </OrderRow>
          <OrderRow>
            <Skeleton variant='text' width={280} />
          </OrderRow>
          <Box
            className={classes.orderProducts}
            sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Skeleton variant='rectangular' width={88} height={88} />
          </Box>
          <OrderRow>
            <Skeleton variant='text' width={228} />
          </OrderRow>
        </OrderContainer>
      </Box>
    )
  }

  return (
    <ListItemButton
      href={`/account/orders/view?orderNumber=${number}`}
      component={NextLink}
      className={classes.buttonRoot}
      sx={[
        (theme) => ({
          width: '100%',
          boxShadow: 'none',
          marginTop: theme.spacings.xxs,
          borderBottom: `1px solid ${theme.vars.palette.divider}`,
          '&:hover': { background: 'none' },
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      <OrderContainer className={classes.orderContainer}>
        <OrderRow>
          <Box component='span' className={classes.orderMoney} sx={{ fontWeight: 'bold' }}>
            <Money {...total?.grand_total} />
          </Box>
          <DateTimeFormat>{order_date}</DateTimeFormat>
          <span>#{number}</span>
        </OrderRow>
        <OrderRow>
          <OrderStateLabel {...props} status={status} />
        </OrderRow>
        <Box className={classes.orderProducts}>
          <Box
            className={classes.images}
            sx={(theme) => ({
              display: 'grid',
              gridAutoFlow: 'column',
              gap: theme.spacings.xxs,
              gridTemplateColumns: 'repeat(auto-fit, 88px)',
              placeContent: 'center',
              placeItems: 'center',
              padding: theme.spacings.xxs,
            })}
          >
            {items
              ?.slice(0, maxItemsInRow)
              .map(
                (item) =>
                  item?.product_url_key &&
                  images?.[item.product_url_key] && (
                    <OrderCardItemImage
                      key={item.product_url_key}
                      {...images[item.product_url_key]}
                    />
                  ),
              )}
            {totalItems > maxItemsInRow && (
              <Box
                className={classes.placeholder}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: 88,
                  height: 88,
                }}
              >{`+${totalItems - maxItemsInRow}`}</Box>
            )}
          </Box>
        </Box>
        <Box className={`${classes.orderRow} ${classes.tracking}`} sx={{ textAlign: 'center' }}>
          {shipments?.[0]?.tracking?.[0] && <TrackingLink {...shipments?.[0].tracking?.[0]} />}
        </Box>
      </OrderContainer>
    </ListItemButton>
  )
}
