import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import { AccountDashboardOrdersDocument } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboardOrders.gql'
import AccountOrders from '@reachdigital/magento-customer/AccountOrders'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'

function AccountOrdersPage() {
  const { data } = useQuery(AccountDashboardOrdersDocument, {
    fetchPolicy: 'cache-and-network',
  })
  const customer = data?.customer

  return (
    <OverlayUi title='Orders' variant='bottom' fullHeight>
      <Container maxWidth='md'>
        <NoSsr>
          <PageMeta
            title='Orders'
            metaDescription='View all your orders'
            metaRobots='NOINDEX, FOLLOW'
          />

          <IconTitle
            iconSrc='/icons/desktop_checkout_box.svg'
            title='Orders'
            alt='orders'
            size='large'
          />
          <AccountOrders {...customer} />
        </NoSsr>
      </Container>
    </OverlayUi>
  )
}

AccountOrdersPage.Layout = PageLayout

registerRouteUi('/account/orders', OverlayUi)

export default AccountOrdersPage
