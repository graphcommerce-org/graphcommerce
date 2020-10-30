import { Container, NoSsr } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import getLayoutHeaderProps from '@reachdigital/magento-app-shell/getLayoutHeaderProps'
import EmailForm from '@reachdigital/magento-cart/email/EmailForm'
import ShippingAddressForm from '@reachdigital/magento-cart/shipping/ShippingAddressForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import getStoreConfig from '@reachdigital/magento-store/getStoreConfig'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
import { PageFC, PageStaticPropsFn } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import apolloClient from '../../lib/apolloClient'

type PageComponent = PageFC<unknown, PageLayoutProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

const CartPage: PageComponent = () => {
  return (
    <BottomDrawerUi title='Checkout' fullHeight>
      <PageMeta title='Checkout' metaDescription='Cart Items' metaRobots='NOINDEX, FOLLOW' />
      <Container maxWidth='md'>
        <NoSsr>
          <AnimatePresence>
            <EmailForm />
            <ShippingAddressForm />
          </AnimatePresence>
        </NoSsr>
      </Container>
    </BottomDrawerUi>
  )
}

CartPage.Layout = PageLayout

registerRouteUi('/checkout', BottomDrawerUi)

export default CartPage

export const getStaticProps: GetPageStaticProps = async () => {
  const client = apolloClient()
  const config = getStoreConfig(client)
  const staticClient = apolloClient()
  const layoutHeader = getLayoutHeaderProps(staticClient)

  await config
  return {
    props: {
      ...(await layoutHeader),
      apolloState: client.cache.extract(),
    },
  }
}
