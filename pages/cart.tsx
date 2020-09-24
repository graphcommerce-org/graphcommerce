import { Container } from '@material-ui/core'
import Cart from 'components/Cart/Cart'
import CartItem from 'components/Cart/CartItem'
import getHeaderProps from 'components/AppLayout/getHeaderProps'
import useHeaderSpacing from 'components/AppLayout/useHeaderSpacing'
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
  const navigation = getHeaderProps(staticClient, {
    rootCategory: String((await config).storeConfig?.root_category_id),
  })

  await config
  return {
    props: {
      ...(await navigation),
      apolloState: client.cache.extract(),
    },
  }
}
