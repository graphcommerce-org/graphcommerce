import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import AccountAddresses from '@reachdigital/magento-customer/AccountAddresses'
import { AccountDashboardAddressesDocument } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboardAddresses.gql'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'

function AccountAddressesPage() {
  const { data } = useQuery(AccountDashboardAddressesDocument, {
    fetchPolicy: 'cache-and-network',
  })
  const customer = data?.customer

  return (
    <OverlayUi title='Orders' variant='bottom' fullHeight>
      <Container maxWidth='md'>
        <NoSsr>
          <PageMeta
            title='Addresses'
            metaDescription='View all your addresses'
            metaRobots='NOINDEX, FOLLOW'
          />
          <IconTitle
            iconSrc='/icons/desktop_addresses.svg'
            title='Addresses'
            alt='addresses'
            size='large'
          />
          <AccountAddresses {...customer} />
        </NoSsr>
      </Container>
    </OverlayUi>
  )
}

AccountAddressesPage.Layout = PageLayout

registerRouteUi('/account/addresses', OverlayUi)

export default AccountAddressesPage
