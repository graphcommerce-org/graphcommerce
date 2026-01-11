'use client'

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
import { CartCrosssellsScroller, CartItemsActionCards } from '@graphcommerce/magento-cart-items'
import { Money } from '@graphcommerce/magento-store'
import {
  FullPageMessage,
  iconShoppingBag,
  LayoutOverlayHeader,
  LayoutTitle,
  OverlayStickyBottom,
  Stepper,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { CircularProgress, Container } from '@mui/material'
import { LayoutOverlayRsc, productListRenderer } from '../../../components'

/** Shared cart content component used by both full page and intercepted overlay routes. */
export function CartContent() {
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
    <LayoutOverlayRsc
      variantMd='right'
      variantSm='bottom'
      widthMd='900px'
      sizeMd='floating'
      sizeSm='full'
      justifyMd='start'
    >
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

      {cart.loading ? (
        <FullPageMessage icon={<CircularProgress />} title={<Trans>Loading</Trans>}>
          <Trans>This may take a second</Trans>
        </FullPageMessage>
      ) : hasItems ? (
        <>
          <Container maxWidth='md'>
            <CartItemsActionCards
              cart={data?.cart}
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
            <CartStartCheckout cart={data?.cart} disabled={hasError} />
          </OverlayStickyBottom>
        </>
      ) : (
        <EmptyCart disableMargin>{error && <ApolloCartErrorAlert error={error} />}</EmptyCart>
      )}
    </LayoutOverlayRsc>
  )
}
