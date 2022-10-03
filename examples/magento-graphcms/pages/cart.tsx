import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
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
import { ActionCartItem, CartItems } from '@graphcommerce/magento-cart-items'
import { ProductListItemFragment } from '@graphcommerce/magento-product'
import { BundleCartItem } from '@graphcommerce/magento-product-bundle'
import { ConfigurableCartItemOptions } from '@graphcommerce/magento-product-configurable'
import { Money, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  GetStaticProps,
  iconShoppingBag,
  Stepper,
  LayoutTitle,
  iconChevronRight,
  IconSvg,
  LayoutOverlayHeader,
  LinkOrButton,
  FullPageMessage,
  ActionCardLayout,
  nonNullable,
  filterNonNullableKeys,
  iconCheckmark,
  RenderType,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, CircularProgress, Container, Typography } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import { LayoutOverlay, LayoutOverlayProps, ProductListItems } from '../components'
import { graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function CartPage() {
  const cart = useCartQuery(CartPageDocument)
  const { data, error } = cart
  const hasItems =
    (data?.cart?.total_quantity ?? 0) > 0 &&
    typeof data?.cart?.prices?.grand_total?.value !== 'undefined'

  console.log(data?.cart?.total_quantity)
  const { query, isReady } = useRouter()

  const summaryItems =
    query.summary === '1' && query.added
      ? Array.isArray(query.added)
        ? query.added
        : [query.added]
      : []

  const isSummary = summaryItems.length > 0
  const cartItems = filterNonNullableKeys(data?.cart?.items)
    .filter((item) => {
      if (isSummary && item.product.sku) {
        const foundItem = summaryItems.indexOf(item.product.sku)
        if (foundItem < 0) return false
        delete summaryItems[foundItem]
      }
      return true
    })
    .slice(0, 1)

  const crossSellItems = cartItems
    .map((cartItem) => cartItem.product?.crosssell_products)
    .flat() as ProductListItemFragment[]

  return (
    <>
      <PageMeta
        title={i18n._(/* i18n */ 'Cart ({0})', { 0: data?.cart?.total_quantity ?? 0 })}
        metaRobots={['noindex']}
      />
      <LayoutOverlayHeader
        switchPoint={0}
        primary={
          <PageLink href='/checkout' passHref>
            <LinkOrButton
              button={{ variant: 'pill' }}
              color='secondary'
              endIcon={<IconSvg src={iconChevronRight} />}
              disabled={!hasItems}
            >
              <Trans id='Checkout' />
            </LinkOrButton>
          </PageLink>
        }
        divider={
          <Container maxWidth='md'>
            <Stepper currentStep={hasItems ? 1 : 0} steps={3} />
          </Container>
        }
      >
        <LayoutTitle size='small' component='span' icon={hasItems ? iconShoppingBag : undefined}>
          {hasItems ? <Trans id='Cart' /> : <Trans id='Cart' />}
        </LayoutTitle>
      </LayoutOverlayHeader>

      <WaitForQueries
        waitFor={[cart, isReady]}
        fallback={
          <FullPageMessage
            icon={<CircularProgress />}
            title='Loading'
            sx={{ width: 800, maxWidth: '100vw' }}
          >
            <Trans id='This may take a second' />
          </FullPageMessage>
        }
      >
        <Container maxWidth='md' sx={{ width: 800, maxWidth: '100vw' }}>
          <>
            {hasItems ? (
              <>
                {isSummary && (
                  <Typography
                    variant='h6'
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 3 }}
                  >
                    <IconSvg src={iconCheckmark} size='large' />
                    <Trans
                      id='<0>{name}</0> has been added to your shopping cart!'
                      components={{ 0: <strong /> }}
                      values={{ name: cartItems?.[0].product.name }}
                    />
                  </Typography>
                )}
                <ActionCardLayout sx={(theme) => ({ my: theme.spacings.sm })}>
                  {cartItems.map((item) => (
                    <ActionCartItem
                      key={item.uid}
                      {...item}
                      size='large'
                      variant='default'
                      readonly={isSummary}
                      details={
                        <RenderType
                          {...item}
                          renderer={{
                            BundleCartItem,
                            ConfigurableCartItem: ConfigurableCartItemOptions,
                          }}
                        />
                      }
                    />
                  ))}
                </ActionCardLayout>

                {!isSummary && (
                  <>
                    <CouponAccordion
                      key='couponform'
                      sx={{ '&:not(.Mui-expanded)': { borderColor: 'transparent' } }}
                    />
                    <CartTotals />

                    <ApolloCartErrorAlert error={error} />
                    <Box key='checkout-button'>
                      <CartStartCheckout {...data?.cart} />
                    </Box>
                  </>
                )}

                <Typography
                  variant='h4'
                  gutterBottom
                  sx={(theme) => ({ mt: theme.spacings.lg, mb: theme.spacings.sm })}
                >
                  <Trans id='Have you thought about this?' />
                </Typography>
                <ProductListItems
                  size='small'
                  items={crossSellItems}
                  sx={{
                    gridTemplateColumns: {
                      xs: `repeat(2, 1fr)`,
                      // md: `repeat(3, 1fr)`,
                    },
                  }}
                />
              </>
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
  overlayGroup: 'checkout',
  Layout: LayoutOverlay,
  layoutProps: {
    variantMd: 'right',
    variantSm: 'bottom',
    sizeMd: 'floating',
    sizeSm: 'full',
    justifyMd: 'start',
    justifySm: 'stretch',
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
