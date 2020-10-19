import { Container } from '@material-ui/core'
import BottomDrawerUi from 'components/AppShell/BottomDrawerUi'
import PageLayout, { PageLayoutProps } from 'components/AppShell/PageLayout'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import Cart from 'components/Cart/Cart'
import CartItem from 'components/Cart/CartItem'
import { PageFC, PageStaticPropsFn } from 'components/Page/types'
import PageMeta from 'components/PageMeta/PageMeta'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import React from 'react'

type PageComponent = PageFC<unknown, PageLayoutProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

const CartPage: PageComponent = () => {
  return (
    <BottomDrawerUi title='Cart'>
      <PageMeta title='Cart' metaDescription='Cart Items' metaRobots='NOINDEX, FOLLOW' />
      <Container>
        <Cart
          renderer={{
            BundleCartItem: CartItem,
            ConfigurableCartItem: CartItem,
            DownloadableCartItem: CartItem,
            SimpleCartItem: CartItem,
            VirtualCartItem: CartItem,
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore GiftCardProduct is only available in Commerce
            GiftCardCartItem: CartItem,
          }}
        />
      </Container>
    </BottomDrawerUi>
  )
}

CartPage.Layout = PageLayout

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
