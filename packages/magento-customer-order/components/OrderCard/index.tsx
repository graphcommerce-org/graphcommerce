import { useQuery } from '@apollo/client'
import { Button, makeStyles, Theme } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import { StoreConfigDocument, Money } from '@reachdigital/magento-store'
import clsx from 'clsx'
import PageLink from 'next/link'
import React from 'react'
import OrderCardItemImage from '../OrderCardItemImage'
import { UseOrderCardItemImages } from '../../hooks/useOrderCardItemImages'
import OrderStateLabel from '../OrderStateLabel'
import TrackingLink from '../TrackingLink'
import { OrderCardFragment } from './OrderCard.gql'
import { responsiveVal } from '@reachdigital/next-ui'

const useStyles = makeStyles(
  (theme: Theme) => ({
    orderContainer: {
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacings.md,
      },
      display: 'grid',
      justifyContent: 'center',
      paddingTop: theme.spacings.lg,
      paddingBottom: theme.spacings.lg,
      width: '100%',
    },
    orderRow: {
      margin: `0 auto calc(${theme.spacings.xxs} * .5) auto`,
      display: 'flex',
      gap: theme.spacings.xxs,
    },
    orderMoney: {
      fontWeight: 'bold',
    },
    orderProducts: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    images: {
      display: 'grid',
      gridAutoFlow: 'column',
      gap: theme.spacings.xxs,
      padding: theme.spacings.xxs,
      width: responsiveVal(75, 125),
      height: responsiveVal(75, 125),
    },
    placeholder: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: 88,
      height: 88,
    },
    buttonRoot: {
      width: '100%',
      boxShadow: 'none',
      marginTop: theme.spacings.xxs,
      borderBottom: `1px solid ${theme.palette.divider}`,
      '&:hover': {
        background: 'none',
      },
    },
    tracking: {
      textAlign: 'center',
    },
  }),
  { name: 'OrderCard' },
)

type OrderCardProps = Partial<OrderCardFragment> & {
  loading?: boolean
} & { images?: UseOrderCardItemImages }

export default function OrderCard(props: OrderCardProps) {
  const { number, shipments, total, items, order_date, images, loading } = props
  const classes = useStyles()

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
      <div className={classes.orderContainer}>
        <div className={classes.orderRow}>
          <Skeleton variant='text' width={192} />
        </div>
        <div className={classes.orderRow}>
          <Skeleton variant='text' width={280} />
        </div>
        <div className={clsx(classes.orderProducts, classes.orderRow)}>
          <Skeleton variant='rect' width={88} height={88} />
        </div>
        <div className={classes.orderRow}>
          <Skeleton variant='text' width={228} />
        </div>
      </div>
    )
  }

  return (
    <PageLink href={`/account/orders/view?orderId=${number}`} passHref>
      <Button
        variant='contained'
        classes={{
          root: classes.buttonRoot,
        }}
      >
        <div className={classes.orderContainer}>
          <div className={classes.orderRow}>
            <span className={classes.orderMoney}>
              <Money {...total?.grand_total} />
            </span>
            <span>{dateFormatter.format(new Date(order_date ?? ''))}</span>
            <span>#{number}</span>
          </div>
          <div className={classes.orderRow}>
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
          </div>
          <div className={clsx(classes.orderProducts)}>
            <div className={classes.images}>
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
                <div className={classes.placeholder}>{`+${totalItems - maxItemsInRow}`}</div>
              )}
            </div>
          </div>
          <div className={clsx(classes.orderRow, classes.tracking)}>
            {shipments?.[0]?.tracking?.[0] && <TrackingLink {...shipments?.[0].tracking?.[0]} />}
          </div>
        </div>
      </Button>
    </PageLink>
  )
}
