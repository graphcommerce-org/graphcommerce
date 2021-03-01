import { Container, NoSsr } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { useRouter } from 'next/router'
import React from 'react'

const OrderDetailPage = () => {
  const router = useRouter()
  const { orderId } = router.query

  return (
    <OverlayUi title='Orders' variant='bottom' fullHeight>
      <PageMeta
        title={`Order Details #${orderId}`}
        metaDescription={`Order detail page for order #${orderId}`}
        metaRobots='NOINDEX, FOLLOW'
      />
      <Container maxWidth='md'>
        <NoSsr>Hello World</NoSsr>
      </Container>
    </OverlayUi>
  )
}

OrderDetailPage.Layout = PageLayout

registerRouteUi('/account/order', OverlayUi)

export default OrderDetailPage
