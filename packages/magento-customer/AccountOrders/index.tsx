import { makeStyles, Theme } from '@material-ui/core'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import clsx from 'clsx'
import React from 'react'
import NoOrdersFound from '../NoOrdersFound'
import OrderCard from '../OrderCard'
import useOrderCardItemImages from '../OrderCardItemImage/useOrderCardItemImages'
import { AccountOrdersFragment } from './AccountOrders.gql'

export type AccountOrdersProps = AccountOrdersFragment

const useStyles = makeStyles(
  (theme: Theme) => ({
    ordersContainer: {
      ...theme.typography.body2,
      marginBottom: theme.spacings.md,
    },
    olderOrdersContainer: {
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacings.lg,
        marginBottom: theme.spacings.lg,
      },
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.md,
    },
  }),
  { name: 'AccountOrders' },
)

export default function AccountOrders(props: AccountOrdersProps) {
  const { orders } = props
  const classes = useStyles()
  const amountLatestOrders = 2
  const images = useOrderCardItemImages(orders)

  // whenever it's possible, pick last {amountLatestOrders} items, then reverse the resulting array,
  // because we want to render the latest order first,
  // but the API returns the orders in ASC order...
  const latestOrders = orders?.items
    .slice(Math.max(orders?.items?.length - 2, 0), orders?.items?.length)
    .reverse()

  const olderOrders = orders?.items.slice(0, Math.max(orders?.items?.length - 2, 0)).reverse()

  return (
    <div className={classes.ordersContainer}>
      <SectionContainer label='Latest orders'>
        {latestOrders?.map(
          (order) => order && <OrderCard key={order.number} {...order} images={images} />,
        )}
        {orders?.items && !orders?.items?.length && <NoOrdersFound />}
      </SectionContainer>

      {orders?.items && orders?.items?.length >= amountLatestOrders + 1 && (
        <SectionContainer label='Older' className={clsx(classes.olderOrdersContainer)}>
          {olderOrders?.map(
            (order) => order && <OrderCard key={order.number} {...order} images={images} />,
          )}
        </SectionContainer>
      )}
    </div>
  )
}
