import { Container, NoSsr, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import {
  useCartQuery,
  CartQuickCheckout,
  CartStartCheckout,
  CartTotals,
  EmptyCart,
  useClearCurrentCartId,
} from '@reachdigital/magento-cart'
import { CartPageDocument } from '@reachdigital/magento-cart-checkout/CartPage.gql'
import { CouponAccordion } from '@reachdigital/magento-cart-coupon'
import { CartItem, CartItems } from '@reachdigital/magento-cart-items'
import { ConfigurableCartItem } from '@reachdigital/magento-product-configurable'
import { StoreConfigDocument, PageMeta } from '@reachdigital/magento-store'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import Button from '@reachdigital/next-ui/Button'
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
  const { data, error } = useCartQuery(CartPageDocument, { returnPartialData: true })
  const clear = useClearCurrentCartId()
  const hasItems =
    (data?.cart?.total_quantity ?? 0) > 0 &&
    typeof data?.cart?.prices?.grand_total?.value !== 'undefined'

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
              <ApolloErrorAlert error={error} />
              <AnimatedRow key='checkout-button'>
                <CartStartCheckout {...data?.cart} />
              </AnimatedRow>
            </>
          ) : (
            <EmptyCart>
              {error && (
                <>
                  <ApolloErrorAlert error={error} />
                  <Button onClick={clear}>Reset Cart</Button>
                </>
              )}
            </EmptyCart>
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
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variant: 'bottom',
      size: 'max',
    },
  }
}
