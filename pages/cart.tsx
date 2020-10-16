import { Container } from '@material-ui/core'
import BottomDrawerLayout, { LayoutDrawerProps } from 'components/AppShell/BottomDrawerLayout'
import Cart from 'components/Cart/Cart'
import CartItem from 'components/Cart/CartItem'
import { PageFC, PageStaticPropsFn } from 'components/Page/types'
import PageMeta from 'components/PageMeta/PageMeta'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import React from 'react'

type PageComponent = PageFC<unknown, LayoutDrawerProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

const CartPage: PageComponent = () => {
  return (
    <>
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
    </>
  )
}

CartPage.Layout = BottomDrawerLayout

export default CartPage

export const getStaticProps: GetPageStaticProps = async () => {
  const client = apolloClient()
  const config = getStoreConfig(client)

  await config
  return {
    props: {
      title: 'Cart',
      apolloState: client.cache.extract(),
    },
  }
}
