import { useQuery } from '@apollo/client'
import { makeStyles, Theme } from '@material-ui/core'
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
  }),
  { name: 'OrderCard' },
)

type OrderCardProps = OrderCardFragment

export default function OrderCard(props: OrderCardProps) {
  const { shipments, total, items, order_date } = props
  const classes = useStyles()
  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  const dateFormatter = new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className={classes.orderContainer}>
      <div className={classes.orderRow}>
        <span className={classes.orderMoney}>
          <Money {...total?.grand_total} />
        </span>
        <span> {dateFormatter.format(new Date(order_date ?? ''))}</span>
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
      <div className={clsx(classes.orderProducts, classes.orderRow)}>
        <OrderCardItemImages items={items} />
      </div>
      <div>
        {shipments?.[0]?.tracking?.[0] && <TrackingLink {...shipments?.[0].tracking?.[0]} />}
      </div>
    </div>
  )
}
