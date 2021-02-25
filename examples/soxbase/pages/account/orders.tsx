import { useQuery } from '@apollo/client'
import { Container, makeStyles, NoSsr, Theme } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import { AccountDashboardOrdersDocument } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboardOrders.gql'
import NoOrdersFound from '@reachdigital/magento-customer/NoOrdersFound'
import OrderCard from '@reachdigital/magento-customer/OrderCard'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import clsx from 'clsx'
import React from 'react'

const useStyles = makeStyles(
  (theme: Theme) => ({
    olderOrdersContainer: {
      [theme.breakpoints.up('md')]: {
        marginTop: theme.spacings.lg,
        marginBottom: theme.spacings.lg,
      },
      marginTop: theme.spacings.md,
      marginBottom: theme.spacings.md,
    },
  }),
  { name: 'OrdersPage' },
)

function AccountOrdersPage() {
  const { data } = useQuery(AccountDashboardOrdersDocument)
  const orders = data?.customer?.orders

  const { data: config } = useQuery(StoreConfigDocument)
  const locale = config?.storeConfig?.locale?.replace('_', '-')

  const classes = useStyles()
  const amountLatestOrders = 2

  // whenever it's possible, pick last {amountLatestOrders} items, then reverse the resulting array,
  // because we want to render the latest order first,
  // but the API returns the orders in ASC order...
  const latestOrders = orders?.items
    .slice(Math.max(orders?.items?.length - 2, 0), orders?.items?.length)
    .reverse()

  const restOrders = orders?.items.slice(0, Math.max(orders?.items?.length - 2, 0)).reverse()

  return (
    <OverlayUi title='Orders' variant='bottom' fullHeight>
      <PageMeta
        title='Orders'
        metaDescription='View all your orders'
        metaRobots='NOINDEX, FOLLOW'
      />
      <Container maxWidth='md'>
        <NoSsr>
          <IconTitle
            iconSrc='/icons/desktop_checkout_box.svg'
            title='Orders'
            alt='orders'
            size='large'
          />
          <SectionContainer label='Latest orders'>
            {latestOrders?.map((order) => order && <OrderCard {...order} locale={locale} />)}
            {orders?.items && !orders?.items?.length && <NoOrdersFound />}
          </SectionContainer>

          {orders?.items && orders?.items?.length >= amountLatestOrders + 1 && (
            <SectionContainer label='Older' className={clsx(classes.olderOrdersContainer)}>
              {restOrders?.map((order) => order && <OrderCard {...order} locale={locale}  />)}
            </SectionContainer>
          )}
        </NoSsr>
      </Container>
    </OverlayUi>
  )
}

AccountOrdersPage.Layout = PageLayout

registerRouteUi('/account/orders', OverlayUi)

export default AccountOrdersPage
