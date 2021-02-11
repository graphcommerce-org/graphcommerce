import { makeStyles, Theme } from '@material-ui/core'
import Money from '@reachdigital/magento-store/Money'
import clsx from 'clsx'
import React from 'react'
import { OrderCardFragment } from './OrderCard.gql'

const useStyles = makeStyles(
  (theme: Theme) => ({
    orderContainer: {
      textAlign: 'center',
      padding: theme.spacings.xs,
    },
    orderRow: {
      marginBottom: theme.spacings.xxs,
    },
    orderStatus: {
      color: theme.palette.success.main,
      fontWeight: 'bold',
    },
    orderMoney: {
      fontWeight: 'bold',
      marginRight: theme.spacings.xxs,
    },
    orderActions: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      '& a': {
        color: theme.palette.primary.mutedText,
        textDecoration: 'underline',
        '&:hover': {
          textDecoration: 'none',
        },
      },
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
  const classes = useStyles()

  return (
    <div className={classes.orderContainer}>
      <div className={classes.orderRow}>
        <span className={classes.orderMoney}>
          <Money currency='USD' value={86.95} />
        </span>
        <span>3 December 2020</span>
      </div>
      <div className={classes.orderRow}>
        <span className={classes.orderStatus}>Your order is on its way!</span>
      </div>
      <div className={clsx(classes.orderProducts, classes.orderRow)}>
        {/* <LinkedProductImage /> */}
      </div>
      <div className={clsx(classes.orderActions, classes.orderRow)}>
        <a href='#'>Track this order</a>
        <a href='#'>Download invoice</a>
      </div>
    </div>
  )
}
