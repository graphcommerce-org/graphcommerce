import { Container } from '@material-ui/core'
import LayoutHeader, { LayoutHeaderProps } from 'components/AppShell/LayoutHeader'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import useHeaderSpacing from 'components/AppShell/useHeaderSpacing'
import Cart from 'components/Cart/Cart'
import CartItem from 'components/Cart/CartItem'
import { PageFC, PageStaticPropsFn } from 'components/Page/types'
import PageMeta from 'components/PageMeta/PageMeta'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import React from 'react'

type PageComponent = PageFC<unknown, LayoutHeaderProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

const CartPage: PageComponent = () => {
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore GiftCardProduct is only available in Commerce
            GiftCardCartItem: CartItem,
          }}
        />
      </Container>
    </>
  )
}

CartPage.Layout = LayoutHeader

export default CartPage

export const getStaticProps: GetPageStaticProps = async () => {
  const client = apolloClient()
  const staticClient = apolloClient()
  const config = getStoreConfig(client)
  const layoutHeader = getLayoutHeaderProps(staticClient)

  await config
  return {
    props: {
      ...(await layoutHeader),
      apolloState: client.cache.extract(),
    },
  }
}
