import { useQuery } from '@apollo/client'
import { Link, makeStyles, Theme } from '@material-ui/core'
import { LocationOn } from '@material-ui/icons'
import Money from '@reachdigital/magento-store/Money'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import clsx from 'clsx'
import React from 'react'
import OrderCardItemImages from '../OrderCardItemImages'
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
    orderStatus: {
      fontStyle: 'italic',
      fontWeight: 'normal',
    },
    orderStatusProcessing: {
      color: theme.palette.secondary.main,
    },
    orderStatusShipped: {
      color: theme.palette.success.main,
      fontStyle: 'normal',
      fontWeight: 'bold',
    },
    orderMoney: {
      fontWeight: 'bold',
      marginRight: theme.spacings.xxs,
    },
    orderActions: {
      width: '100%',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
    },
    orderAction: {
      display: 'flex',
      alignItems: 'center',
      color: theme.palette.primary.main,
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
  const { status, shipments, total, items, order_date } = props
  const classes = useStyles()
  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  // TODO: use per-shop configurable values
  const orderProcessing = status === 'Pending'
  const orderShipped = status === 'Shipped'
  const orderDelivered = status === 'Delivered'

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
        <span
          className={clsx(classes.orderStatus, {
            [classes.orderStatusProcessing]: orderProcessing,
            [classes.orderStatusShipped]: orderShipped,
          })}
        >
          {status && (
            <>
              {orderProcessing && 'Your order is being processed'}
              {orderShipped && 'Your order is on its way!'}
              {orderDelivered && 'Your order has been delivered'}
            </>
          )}
        </span>
      </div>
      <div className={clsx(classes.orderProducts, classes.orderRow)}>
        <OrderCardItemImages items={items} />
      </div>
      <div className={classes.orderActions}>
        <div className={classes.orderAction}>
          <LocationOn />
          <Link href='#'>TR4CK1H1S04D34L1NK</Link>
        </div>
      </div>
    </div>
  )
}
