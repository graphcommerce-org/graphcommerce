import { Container } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import Cart from '@reachdigital/magento-cart/cart/Cart'
import CartItem2 from '@reachdigital/magento-cart/cart/CartItem2'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
import ForwardButton from '@reachdigital/next-ui/AppShell/ForwardButton'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import apolloClient from '../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<PageLayoutProps>

function CartPage() {
  return (
    <BottomDrawerUi
      title='Cart'
      headerForward={
        <PageLink href='/checkout'>
          <ForwardButton color='primary'>Checkout</ForwardButton>
        </PageLink>
      }
    >
      <PageMeta title='Cart' metaDescription='Cart Items' metaRobots='NOINDEX, FOLLOW' />
      <Container>
        <Cart
          renderer={{
            BundleCartItem: CartItem2,
            ConfigurableCartItem: CartItem2,
            DownloadableCartItem: CartItem2,
            SimpleCartItem: CartItem2,
            VirtualCartItem: CartItem2,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore GiftCardProduct is only available in Commerce
            GiftCardCartItem: CartItem2,
          }}
        />
      </Container>
    </BottomDrawerUi>
  )
}

CartPage.Layout = PageLayout

registerRouteUi('/cart', BottomDrawerUi)

export default CartPage

export const getStaticProps: GetPageStaticProps = async () => {
  const client = apolloClient()
  const staticClient = apolloClient()

  const config = client.query({ query: StoreConfigDocument })
  const pageLayout = staticClient.query({ query: PageLayoutDocument })

  await config
  return {
    props: {
      ...(await pageLayout).data,
      apolloState: client.cache.extract(),
    },
  }
}
