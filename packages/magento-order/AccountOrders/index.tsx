import { Link, makeStyles, Theme } from '@material-ui/core'
import { Pagination, SectionContainer } from '@reachdigital/next-ui'
import PageLink from 'next/link'
import React from 'react'
import NoOrdersFound from '../../magento-customer/NoOrdersFound'
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

  const pageInfo = orders?.page_info
  const isFirstPage = pageInfo?.current_page === 1

  // whenever it's possible, pick last {amountLatestOrders} items, then reverse the resulting array,
  // because we want to render the latest order first,
  // but the API returns the orders in ASC order...
  const latestOrders = orders?.items
    .slice(Math.max(orders?.items?.length - 2, 0), orders?.items?.length)
    .reverse()

  const olderOrders = isFirstPage
    ? orders?.items.slice(0, Math.max(orders?.items?.length - 2, 0)).reverse()
    : orders?.items

  return (
    <div className={classes.ordersContainer}>
      {isFirstPage && (
        <SectionContainer labelLeft='Latest orders'>
          {latestOrders?.map(
            (order) => order && <OrderCard key={order.number} {...order} images={images} />,
          )}
          {orders?.items && !orders?.items?.length && <NoOrdersFound />}
        </SectionContainer>
      )}

      {orders?.items &&
        ((isFirstPage && orders?.items?.length >= amountLatestOrders + 1) || !isFirstPage) && (
          <SectionContainer
            labelLeft='Older'
            classes={{ sectionContainer: classes.olderOrdersContainer }}
          >
            {olderOrders?.map(
              (order) => order && <OrderCard key={order.number} {...order} images={images} />,
            )}
          </SectionContainer>
        )}

      <Pagination
        count={pageInfo?.total_pages ?? 1}
        page={pageInfo?.current_page ?? 1}
        renderLink={(p: number, icon: React.ReactNode) => (
          <PageLink href={p === 1 ? '/account/orders' : `/account/orders?page=${p}`} passHref>
            <Link color='primary'>{icon}</Link>
          </PageLink>
        )}
      />
    </div>
  )
}
