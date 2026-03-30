import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  ApolloCartErrorAlert,
  CartStartCheckout,
  CartStartCheckoutLinkOrButton,
  CartTotals,
  EmptyCart,
  getCartDisabled,
  useCartQuery,
} from '@graphcommerce/magento-cart'
import { CartPageDocument } from '@graphcommerce/magento-cart-checkout'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import { CartCrosssellsScroller, CartItemsActionCards } from '@graphcommerce/magento-cart-items'
import { Money, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  FullPageMessage,
  iconShoppingBag,
  LayoutOverlayHeader,
  LayoutTitle,
  OverlayStickyBottom,
  Stepper,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { CircularProgress, Container } from '@mui/material'
import type { LayoutOverlayProps } from '../components'
import { LayoutOverlay, productListRenderer } from '../components'
import { graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function CartPage() {
  const cart = useCartQuery(CartPageDocument, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
  })
  const { error, data } = cart
  const hasError = Boolean(error)
  const hasItems =
    (data?.cart?.total_quantity ?? 0) > 0 &&
    typeof data?.cart?.prices?.grand_total?.value !== 'undefined'
  const quantity = data?.cart?.total_quantity ?? 0

  return (
    <>
      <PageMeta title={t`Cart (${quantity})`} metaRobots={['noindex']} />
      <LayoutOverlayHeader
        switchPoint={0}
        primary={<CartStartCheckoutLinkOrButton cart={data?.cart} disabled={hasError} />}
        divider={
          <Container maxWidth='md'>
            <Stepper currentStep={hasItems ? 1 : 0} steps={3} />
          </Container>
        }
      >
        <LayoutTitle size='small' component='span' icon={hasItems ? iconShoppingBag : undefined}>
          {hasItems ? (
            <Trans>
              Total <Money {...data?.cart?.prices?.grand_total} />
            </Trans>
          ) : (
            <Trans>Cart</Trans>
          )}
        </LayoutTitle>
      </LayoutOverlayHeader>
      <WaitForQueries
        waitFor={cart}
        fallback={
          <FullPageMessage icon={<CircularProgress />} title={<Trans>Loading</Trans>}>
            <Trans>This may take a second</Trans>
          </FullPageMessage>
        }
      >
        {hasItems ? (
          <>
            <Container maxWidth='md'>
              <CartItemsActionCards
                cart={data.cart}
                sx={(theme) => ({ position: 'relative', zIndex: 1, mb: theme.spacings.md })}
              />
              <CouponAccordion key='couponform' />
              <CartTotals containerMargin sx={{ typography: 'body1' }} />
              <ApolloCartErrorAlert error={error} />
            </Container>
            <CartCrosssellsScroller
              renderer={productListRenderer}
              sx={(theme) => ({ mt: theme.spacings.md })}
            />
            <OverlayStickyBottom sx={{ py: 0.1 }}>
              <CartStartCheckout cart={data.cart} disabled={hasError} />
            </OverlayStickyBottom>
          </>
        ) : (
          <EmptyCart disableMargin>{error && <ApolloCartErrorAlert error={error} />}</EmptyCart>
        )}
      </WaitForQueries>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'cart',
  Layout: LayoutOverlay,
  layoutProps: {
    variantMd: 'right',
    variantSm: 'bottom',
    widthMd: '900px',
    sizeMd: 'floating',
    sizeSm: 'full',
    justifyMd: 'start',
  },
}
CartPage.pageOptions = pageOptions

export default CartPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCartDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
