import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  ApolloCartErrorAlert,
  CartStartCheckout,
  CartStartCheckoutLinkOrButton,
  CartTotals,
  EmptyCart,
  useCartQuery,
} from '@graphcommerce/magento-cart'
import { CartPageDocument } from '@graphcommerce/magento-cart-checkout'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import { CartItemsActionCards } from '@graphcommerce/magento-cart-items'
import { Money, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  iconShoppingBag,
  Stepper,
  LayoutTitle,
  LayoutOverlayHeader,
  FullPageMessage,
} from '@graphcommerce/next-ui'
import { OverlayStickyBottom } from '@graphcommerce/next-ui/Overlay/components/OverlayStickyBottom'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, CircularProgress, Container } from '@mui/material'
import { LayoutOverlay, LayoutOverlayProps } from '../components'
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

  return (
    <>
      <PageMeta
        title={i18n._(/* i18n */ 'Cart ({0})', { 0: data?.cart?.total_quantity ?? 0 })}
        metaRobots={['noindex']}
      />
      <LayoutOverlayHeader
        switchPoint={0}
        primary={<CartStartCheckoutLinkOrButton {...data?.cart} disabled={hasError} />}
        divider={
          <Container maxWidth='md'>
            <Stepper currentStep={hasItems ? 1 : 0} steps={3} />
          </Container>
        }
      >
        <LayoutTitle size='small' component='span' icon={hasItems ? iconShoppingBag : undefined}>
          {hasItems ? (
            <Trans
              id='Total <0/>'
              components={{ 0: <Money {...data?.cart?.prices?.grand_total} /> }}
            />
          ) : (
            <Trans id='Cart' />
          )}
        </LayoutTitle>
      </LayoutOverlayHeader>
      <WaitForQueries
        waitFor={cart}
        fallback={
          <FullPageMessage icon={<CircularProgress />} title={<Trans id='Loading' />}>
            <Trans id='This may take a second' />
          </FullPageMessage>
        }
      >
        <Container maxWidth='md'>
          <>
            {hasItems ? (
              <Box sx={(theme) => ({ mt: theme.spacings.sm })}>
                <CartItemsActionCards
                  cart={data.cart}
                  itemProps={{
                    variant: 'default',
                  }}
                />
                <CouponAccordion key='couponform' />
                <CartTotals containerMargin sx={{ typography: 'body1' }} />
                <ApolloCartErrorAlert error={error} />
                <OverlayStickyBottom sx={{ py: 0.1 }}>
                  <CartStartCheckout {...data?.cart} disabled={hasError} />
                </OverlayStickyBottom>
              </Box>
            ) : (
              <EmptyCart>{error && <ApolloCartErrorAlert error={error} />}</EmptyCart>
            )}
          </>
        </Container>
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

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
