import { useQuery } from '@apollo/client'
import { StoreConfigDocument, Money } from '@graphcommerce/magento-store'
import { responsiveVal, extendableComponent } from '@graphcommerce/next-ui'
import { Box, Button, styled, SxProps, Theme } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import clsx from 'clsx'
import PageLink from 'next/link'
import { UseOrderCardItemImages } from '../../hooks/useOrderCardItemImages'
import OrderCardItemImage from '../OrderCardItemImage'
import OrderStateLabel from '../OrderStateLabel'
import TrackingLink from '../TrackingLink'
import { OrderCardFragment } from './OrderCard.gql'

type OrderCardProps = Partial<OrderCardFragment> & {
  loading?: boolean
  images?: UseOrderCardItemImages
  sx?: SxProps<Theme>
}

const componentName = 'NoOrdersFound' as const
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
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacings.md,
    },
    display: 'grid',
    justifyContent: 'center',
    paddingTop: theme.spacings.lg,
    paddingBottom: theme.spacings.lg,
    width: '100%',
  }),
)

const OrderRow = styled(Box, { name: componentName, target: classes.orderRow })(({ theme }) => ({
  margin: `0 auto calc(${theme.spacings.xxs} * .5) auto`,
  display: 'flex',
  gap: theme.spacings.xxs,
}))

export default function OrderCard(props: OrderCardProps) {
  const { number, shipments, total, items, order_date, images, loading, sx = [] } = props

  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

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
    <PageLink href={`/account/orders/view?orderId=${number}`} passHref>
      <Button
        variant='contained'
        className={classes.buttonRoot}
        sx={[
          (theme) => ({
            width: '100%',
            boxShadow: 'none',
            marginTop: theme.spacings.xxs,
            borderBottom: `1px solid ${theme.palette.divider}`,
            '&:hover': {
              background: 'none',
            },
          }),
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
      >
        <OrderContainer className={classes.orderContainer}>
          <OrderRow>
            <Box component='span' className={classes.orderMoney} sx={{ fontWeight: 'bold' }}>
              <Money {...total?.grand_total} />
            </Box>
            <span>{dateFormatter.format(new Date(order_date ?? ''))}</span>
            <span>#{number}</span>
          </OrderRow>
          <OrderRow>
            <OrderStateLabel
              items={items}
              renderer={{
                Ordered: () => <span>Your order is being processed</span>,
                Invoiced: () => <span>Your order has been invoiced</span>,
                Shipped: () => <span>Your order is on its way!</span>,
                Refunded: () => <span>Your order has been refunded</span>,
                Canceled: () => <span>Your order has been canceled</span>,
                Returned: () => <span>Your order has been returned</span>,
                Partial: () => <span>Your order has been partially processed</span>,
              }}
            />
          </OrderRow>
          <Box
            className={classes.orderProducts}
            sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}
          >
            <Box
              className={classes.images}
              sx={{
                display: 'grid',
                gridAutoFlow: 'column',
                gap: theme.spacings.xxs,
                padding: theme.spacings.xxs,
                width: responsiveVal(75, 125),
                height: responsiveVal(75, 125),
              }}
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
          <Box className={clsx(classes.orderRow, classes.tracking)} sx={{ textAlign: 'center' }}>
            {shipments?.[0]?.tracking?.[0] && <TrackingLink {...shipments?.[0].tracking?.[0]} />}
          </Box>
        </OrderContainer>
      </Button>
    </PageLink>
  )
}
