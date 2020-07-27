import React from 'react'
import { GetStaticProps } from 'next'
import ShopLayout, { ShopLayoutProps, PageWithShopLayout } from 'components/ShopLayout'
import getHeaderProps from 'components/Header/getHeaderProps'
import { Container } from '@material-ui/core'
import overlay from 'components/PageTransition/overlay'
import { useHeaderSpacing } from 'components/Header/useHeaderSpacing'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import Cart from 'components/Cart'
import CartItem from 'components/Cart/CartItem'

const ProductPage: PageWithShopLayout = () => {
  const { marginTop } = useHeaderSpacing()

  return (
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
  )
}

ProductPage.Layout = ShopLayout
ProductPage.pageTransition = overlay

export default ProductPage

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
