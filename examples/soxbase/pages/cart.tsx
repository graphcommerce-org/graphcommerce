import { useQuery } from '@apollo/client'
import { Container, NoSsr, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { ClientCartDocument } from '@reachdigital/magento-cart/ClientCart.gql'
import CartItem from '@reachdigital/magento-cart/cart/CartItem'
import CartItems from '@reachdigital/magento-cart/cart/CartItems'
import CartQuickCheckout from '@reachdigital/magento-cart/cart/CartQuickCheckout'
import CartStartCheckout from '@reachdigital/magento-cart/cart/CartStartCheckout'
import CartTotals from '@reachdigital/magento-cart/cart/CartTotals'
import CheckoutStepper from '@reachdigital/magento-cart/cart/CheckoutStepper'
import EmptyCart from '@reachdigital/magento-cart/cart/EmptyCart'
import CouponAccordion from '@reachdigital/magento-cart/coupon/CouponAccordion'
import ConfigurableCartItem from '@reachdigital/magento-product-configurable/ConfigurableCartItem'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import PageMeta from '../components/AppShell/PageMeta'
import SheetShell, { SheetShellProps } from '../components/AppShell/SheetShell'
import apolloClient from '../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props>

function CartPage() {
  const { data } = useQuery(ClientCartDocument, { ssr: false })
  const hasItems = (data?.cart?.total_quantity ?? 0) > 0

  return (
    <Container maxWidth='md'>
      <PageMeta title='Cart' metaDescription='Cart Items' metaRobots={['noindex']} />
      <NoSsr>
        <Typography variant='h5' component='h1' align='center'>
          Checkout
        </Typography>

        <AnimatePresence initial={false}>
          {hasItems ? (
            <>
              <CheckoutStepper steps={3} currentStep={1} key='checkout-stepper' />
              <AnimatedRow key='quick-checkout'>
                <CartQuickCheckout {...data?.cart?.prices?.grand_total} />
              </AnimatedRow>
              <CartItems
                items={data?.cart?.items}
                id={data?.cart?.id ?? ''}
                key='cart'
                renderer={{
                  BundleCartItem: CartItem,
                  ConfigurableCartItem,
                  DownloadableCartItem: CartItem,
                  SimpleCartItem: CartItem,
                  VirtualCartItem: CartItem,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore GiftCardProduct is only available in Commerce
                  GiftCardCartItem: CartItem,
                }}
              />
              <CouponAccordion key='couponform' />
              <CartTotals
                key='totals'
                prices={data?.cart?.prices}
                shipping_addresses={data?.cart?.shipping_addresses ?? []}
              />
              <AnimatedRow key='checkout-button'>
                <CartStartCheckout {...data?.cart?.prices?.grand_total} />
              </AnimatedRow>
            </>
          ) : (
            <EmptyCart />
          )}
        </AnimatePresence>
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'checkout',
  SharedComponent: SheetShell,
  sharedKey: () => 'checkout',
}
CartPage.pageOptions = pageOptions

export default CartPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
    },
  }
}
