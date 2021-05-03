import { Container, NoSsr, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { CartPageDocument } from '@reachdigital/magento-cart-checkout/CartPage.gql'
import CouponAccordion from '@reachdigital/magento-cart-coupon/CouponAccordion/CouponAccordion'
import CartItem from '@reachdigital/magento-cart-items/CartItem/CartItem'
import CartItems from '@reachdigital/magento-cart-items/CartItems/CartItems'
import CartQuickCheckout from '@reachdigital/magento-cart/CartQuickCheckout/CartQuickCheckout'
import CartStartCheckout from '@reachdigital/magento-cart/CartStartCheckout/CartStartCheckout'
import CartTotals from '@reachdigital/magento-cart/CartTotals/CartTotals'
import { useCartQuery } from '@reachdigital/magento-cart/CurrentCartId/useCartQuery'
import EmptyCart from '@reachdigital/magento-cart/EmptyCart/EmptyCart'
import ConfigurableCartItem from '@reachdigital/magento-product-configurable/ConfigurableCartItem'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import Stepper from '@reachdigital/next-ui/Stepper/Stepper'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import SheetShell, { SheetShellProps } from '../components/AppShell/SheetShell'
import apolloClient from '../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props>

function CartPage() {
  const { data } = useCartQuery(CartPageDocument, { returnPartialData: true })
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
              <Stepper steps={3} currentStep={1} key='checkout-stepper' />
              <AnimatedRow key='quick-checkout'>
                <CartQuickCheckout {...data?.cart} />
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
