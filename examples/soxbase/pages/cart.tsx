import { useQuery } from '@apollo/client'
import { CircularProgress, Container, makeStyles, Theme } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import { ClientCartDocument } from '@reachdigital/magento-cart/ClientCart.gql'
import Cart from '@reachdigital/magento-cart/cart/Cart'
import CartItem2 from '@reachdigital/magento-cart/cart/CartItem2'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import responsiveVal from '@reachdigital/next-ui/Styles/responsiveVal'
import React from 'react'
import apolloClient from '../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<PageLayoutProps>

const useStyles = makeStyles(
  (theme: Theme) => ({
    loader: {
      display: 'block',
      margin: `${responsiveVal(40, 75)} auto`,
      textAlign: 'center',
    },
  }),
  { name: 'CartPage' },
)

function CartPage() {
  const { data, loading } = useQuery(ClientCartDocument)
  const classes = useStyles()

  return (
    <BottomDrawerUi title='Checkout' fullHeight>
      <PageMeta title='Checkout' metaDescription='Cart Items' metaRobots='NOINDEX, FOLLOW' />
      <Container maxWidth='md'>
        {loading ? (
          <CircularProgress className={classes.loader} />
        ) : (
          <Cart
            clientCartQueryData={data ?? {}}
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
        )}
      </Container>
    </BottomDrawerUi>
  )
}

CartPage.Layout = PageLayout

registerRouteUi('/cart', BottomDrawerUi)

export default CartPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))

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
