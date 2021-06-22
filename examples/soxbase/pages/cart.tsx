import { Container, NoSsr, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import {
  CartQuickCheckout,
  CartStartCheckout,
  CartTotals,
  EmptyCart,
  useCartQuery,
  ApolloCartErrorAlert,
} from '@reachdigital/magento-cart'
import { CartPageDocument } from '@reachdigital/magento-cart-checkout'
import { CouponAccordion } from '@reachdigital/magento-cart-coupon'
import { CartItem, CartItems } from '@reachdigital/magento-cart-items'
import { ConfigurableCartItem } from '@reachdigital/magento-product-configurable'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import Stepper from '@reachdigital/next-ui/Stepper/Stepper'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import SheetShell, { SheetShellProps } from '../components/AppShell/SheetShell'
import apolloClient from '../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props>

function CartPage() {
  const { data, error, loading } = useCartQuery(CartPageDocument, { returnPartialData: true })
  const hasItems =
    (data?.cart?.total_quantity ?? 0) > 0 &&
    typeof data?.cart?.prices?.grand_total?.value !== 'undefined'

  if (loading) return null

  return (
    <>
      <PageMeta title='Cart' metaDescription='Cart Items' metaRobots={['noindex']} />
      <NoSsr>
        {/* {hasItems && (
          <>
            <div style={{ display: 'flex', 'justify-content': 'space-between' }}>
              <div style={{ 'text-align': 'left', flex: '1' }} />

              <div style={{ flex: '1' }}>
                <Typography variant='h5' component='h1' align='center'>
                  Checkout
                </Typography>
                <Stepper steps={3} currentStep={1} key='checkout-stepper' />
              </div>

              <div style={{ 'text-align': 'right', flex: '1' }}>
                <Button color='secondary' variant='pill'>
                  Right button
                </Button>
              </div>
            </div>
          </>
        )} */}

        <Container maxWidth='md'>
          <Typography variant='h5' component='h1' align='center'>
            Checkout
          </Typography>
          <Stepper steps={3} currentStep={1} key='checkout-stepper' />

          <AnimatePresence initial={false}>
            {hasItems ? (
              <>
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
                <ApolloCartErrorAlert error={error} />
                <AnimatedRow key='checkout-button'>
                  <CartStartCheckout {...data?.cart} />
                </AnimatedRow>
              </>
            ) : (
              <EmptyCart>{error && <ApolloCartErrorAlert error={error} />}</EmptyCart>
            )}
          </AnimatePresence>
        </Container>
      </NoSsr>
    </>
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
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
    },
  }
}
