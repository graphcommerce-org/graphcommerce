import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import {
  ApolloCartErrorAlert,
  CartStartCheckout,
  CartTotals,
  EmptyCart,
  useCartQuery,
} from '@reachdigital/magento-cart'
import { CartPageDocument } from '@reachdigital/magento-cart-checkout'
import { CouponAccordion } from '@reachdigital/magento-cart-coupon'
import { CartItem, CartItems } from '@reachdigital/magento-cart-items'
import { ConfigurableCartItem } from '@reachdigital/magento-product-configurable'
import { Money, PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import {
  AnimatedRow,
  AppShellTitle,
  Button,
  GetStaticProps,
  iconShoppingBag,
  SheetShellHeader,
  Stepper,
  Title,
  iconChevronRight,
  SvgImage,
} from '@reachdigital/next-ui'
import { AnimatePresence } from 'framer-motion'
import PageLink from 'next/link'
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
        <SheetShellHeader
          primary={
            <PageLink href='/checkout' passHref>
              <Button color='secondary' text='bold' variant='pill-link' disabled={!hasItems}>
                Start Checkout{' '}
                {hasItems ? (
                  <>
                    (<Money {...data?.cart?.prices?.grand_total} />)
                  </>
                ) : undefined}
                <SvgImage
                  src={iconChevronRight}
                  alt='chevron right'
                  shade='inverted'
                  size='small'
                  loading='eager'
                />
              </Button>
            </PageLink>
          }
          divider={
            <Container maxWidth='md'>
              <Stepper currentStep={1} steps={3} />
            </Container>
          }
          scrolled
        >
          <Title size='small' component='span'>
            Checkout
          </Title>
        </SheetShellHeader>
        <Container maxWidth='md'>
          <AnimatePresence initial={false}>
            {hasItems ? (
              <>
                <AnimatedRow key='quick-checkout'>
                  <AppShellTitle icon={iconShoppingBag}>
                    Cart Total: <Money {...data?.cart?.prices?.grand_total} />
                  </AppShellTitle>
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
                <CartTotals containerMargin />
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
