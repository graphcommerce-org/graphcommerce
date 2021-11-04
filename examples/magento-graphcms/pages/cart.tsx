import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  ApolloCartErrorAlert,
  CartStartCheckout,
  CartTotals,
  EmptyCart,
  useCartQuery,
} from '@graphcommerce/magento-cart'
import { CartPageDocument } from '@graphcommerce/magento-cart-checkout'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import { CartItem, CartItems } from '@graphcommerce/magento-cart-items'
import { ConfigurableCartItem } from '@graphcommerce/magento-product-configurable'
import { Money, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
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
  SvgImageSimple,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
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
      <PageMeta
        title={t`Cart (${data?.cart?.total_quantity ?? 0})`}
        metaDescription={t`Cart Items`}
        metaRobots={['noindex']}
      />
      <NoSsr>
        <SheetShellHeader
          primary={
            <PageLink href='/checkout' passHref>
              <Button
                color='secondary'
                variant='pill-link'
                disabled={!hasItems}
                size='small'
                endIcon={<SvgImageSimple src={iconChevronRight} size='small' inverted />}
              >
                <Trans>Next</Trans>
              </Button>
            </PageLink>
          }
          divider={
            <Container maxWidth='md'>
              <Stepper currentStep={1} steps={3} />
            </Container>
          }
        >
          <Title size='small' component='span' icon={hasItems ? iconShoppingBag : undefined}>
            {hasItems ? (
              <>
                Cart Total: <Money {...data?.cart?.prices?.grand_total} />
              </>
            ) : (
              <>Cart</>
            )}
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
