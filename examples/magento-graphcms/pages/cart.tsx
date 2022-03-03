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
  GetStaticProps,
  iconShoppingBag,
  Stepper,
  LayoutTitle,
  iconChevronRight,
  IconSvg,
  LayoutOverlayHeader,
  LinkOrButton,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import PageLink from 'next/link'
import { LayoutOverlay, LayoutOverlayProps } from '../components'
import { graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

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
        <LayoutOverlayHeader
          primary={
            hasItems && (
              <PageLink href='/checkout' passHref>
                <LinkOrButton
                  button={{ variant: 'pill', disabled: !hasItems }}
                  color='secondary'
                  endIcon={<IconSvg src={iconChevronRight} />}
                >
                  <Trans>Next</Trans>
                </LinkOrButton>
              </PageLink>
            )
          }
          divider={
            hasItems && (
              <Container maxWidth='md'>
                <Stepper currentStep={1} steps={3} />
              </Container>
            )
          }
        >
          <LayoutTitle size='small' component='span' icon={hasItems ? iconShoppingBag : undefined}>
            {hasItems ? (
              <>
                Cart Total: <Money {...data?.cart?.prices?.grand_total} />
              </>
            ) : (
              <>Cart</>
            )}
          </LayoutTitle>
        </LayoutOverlayHeader>
        <Container maxWidth='md'>
          <AnimatePresence initial={false}>
            {hasItems ? (
              <>
                <AnimatedRow key='quick-checkout'>
                  <LayoutTitle icon={iconShoppingBag}>
                    Cart Total: <Money {...data?.cart?.prices?.grand_total} />
                  </LayoutTitle>
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

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'checkout',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'bottom', variantSm: 'bottom' },
}
CartPage.pageOptions = pageOptions

export default CartPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
