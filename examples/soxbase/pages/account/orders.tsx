import { Container, NoSsr } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'

function AccountOrdersPage() {
  return (
    <OverlayUi title='Orders' variant='center'>
      <PageMeta
        title='Orders'
        metaDescription='View all your orders'
        metaRobots='NOINDEX, FOLLOW'
      />
      <Container maxWidth='md'>
        <NoSsr>
          <IconTitle iconSrc='/icons/desktop_checkout_box.svg' title='Orders' alt='orders' big />
        </NoSsr>
      </Container>
    </OverlayUi>
  )
}

AccountOrdersPage.Layout = PageLayout

registerRouteUi('/account/orders', OverlayUi)

export default AccountOrdersPage
