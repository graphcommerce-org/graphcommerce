import { Container } from '@material-ui/core'
import getAppShellProps from 'components/AppLayout/getAppShellProps'
import useHeaderSpacing from 'components/AppLayout/useHeaderSpacing'
import Cart from 'components/Cart/Cart'
import CartItem from 'components/Cart/CartItem'
import PageMeta from 'components/PageMeta/PageMeta'
import overlay from 'components/PageTransition/overlay'
import ShopLayout, { ShopLayoutProps, PageWithShopLayout } from 'components/ShopLayout'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import { GetStaticProps } from 'next'
import React from 'react'

const CartPage: PageWithShopLayout = () => {
  const { marginTop } = useHeaderSpacing()

  return (
    <>
      <PageMeta title='Cart' metaDescription='Cart Items' metaRobots='NOINDEX, FOLLOW' />
      <Container className={marginTop}>
        <Cart
          renderer={{
            BundleCartItem: CartItem,
            ConfigurableCartItem: CartItem,
            DownloadableCartItem: CartItem,
            SimpleCartItem: CartItem,
            VirtualCartItem: CartItem,
          }}
        />
      </Container>
    </>
  )
}

CartPage.Layout = ShopLayout
CartPage.pageTransition = overlay

export default CartPage

export const getStaticProps: GetStaticProps<ShopLayoutProps> = async () => {
  const client = apolloClient()
  const staticClient = apolloClient()
  const config = getStoreConfig(client)
  const navigation = getAppShellProps(staticClient)

  await config
  return {
    props: {
      ...(await navigation),
      apolloState: client.cache.extract(),
    },
  }
}
