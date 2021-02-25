import { useQuery } from '@apollo/client'
import { makeStyles, Theme } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import Money from '@reachdigital/magento-store/Money'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import clsx from 'clsx'
import React from 'react'
import OrderCardItemImages from '../OrderCardItemImages'
import OrderStateLabel from '../OrderStateLabel'
import TrackingLink from '../TrackingLink'
import { OrderCardFragment } from './OrderCard.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    orderContainer: {
      [theme.breakpoints.up('sm')]: {
        padding: theme.spacings.md,
      },
      textAlign: 'center',
      paddingTop: theme.spacings.lg,
      paddingBottom: theme.spacings.lg,
      borderBottom: `1px solid ${theme.palette.divider}`,
    },
    orderRow: {
      marginBottom: `calc(${theme.spacings.xxs} * .5)`,
    },
    orderMoney: {
      fontWeight: 'bold',
      marginRight: theme.spacings.xxs,
    },
    orderProducts: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    root: {
      display: 'inline-block',
      marginLeft: `calc((${theme.spacings.sm} * .5) * -1)`,
      marginRight: theme.spacings.sm,
    },
  }),
  { name: 'OrderCard' },
)

type OrderCardProps = Partial<OrderCardFragment> & {
  loading?: boolean
}

export default function OrderCard(props: OrderCardProps) {
  const { loading, shipments, total, items, order_date } = props
  const { orderContainer, orderRow, orderMoney, orderProducts, ...skeletonClasses } = useStyles()
  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className={orderContainer}>
      <div className={orderRow}>
        {!loading ? (
          <span className={orderMoney}>
            <Money {...total?.grand_total} />
          </span>
        ) : (
          <Skeleton classes={skeletonClasses} variant='text' width={64} />
        )}

        {!loading ? (
          <span>{dateFormatter.format(new Date(order_date ?? ''))}</span>
        ) : (
          <Skeleton classes={skeletonClasses} variant='text' width={128} />
        )}
      </div>
      <div className={orderRow}>
        {!loading ? (
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
        ) : (
          <Skeleton classes={skeletonClasses} variant='text' width={280} />
        )}
      </div>
      <div className={clsx(orderProducts, orderRow)}>
        {!loading ? (
          <OrderCardItemImages items={items} />
        ) : (
          <>
            <Skeleton classes={skeletonClasses} variant='rect' width={88} height={88} />
          </>
        )}
      </div>
      <div>
        {!loading ? (
          <>{shipments?.[0]?.tracking?.[0] && <TrackingLink {...shipments?.[0].tracking?.[0]} />}</>
        ) : (
          <>
            <Skeleton classes={skeletonClasses} variant='text' width={228} />
          </>
        )}
      </div>
    </div>
  )
}
