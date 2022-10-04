import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import { Image } from '@graphcommerce/image'
import {
  ApolloCartErrorAlert,
  CartStartCheckout,
  CartTotals,
  CrosssellsDocument,
  EmptyCart,
  useCartQuery,
} from '@graphcommerce/magento-cart'
import { CartPageDocument } from '@graphcommerce/magento-cart-checkout'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import { ActionCartItem } from '@graphcommerce/magento-cart-items'
import { ProductListItemFragment } from '@graphcommerce/magento-product'
import { BundleCartItem } from '@graphcommerce/magento-product-bundle'
import { ConfigurableCartItemOptions } from '@graphcommerce/magento-product-configurable'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
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
  filterNonNullableKeys,
  iconCheckmark,
  RenderType,
  Button,
  iconClose,
  responsiveVal,
  ItemScroller,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Alert, Box, CircularProgress, Container, Fab, Typography, lighten } from '@mui/material'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import { useMemo } from 'react'
import {
  LayoutOverlay,
  LayoutOverlayProps,
  ProductListItems,
  productListRenderer,
} from '../components'
import { graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function CartPage() {
  const cart = useCartQuery(CartPageDocument)
  const { data, error } = cart
  const hasItems =
    (data?.cart?.total_quantity ?? 0) > 0 &&
    typeof data?.cart?.prices?.grand_total?.value !== 'undefined'

  const cartItems = filterNonNullableKeys(data?.cart?.items)

  const lastItem = cartItems[cartItems.length - 1]
  const crosssels = useQuery(CrosssellsDocument, {
    variables: { pageSize: 1, filters: { sku: { eq: lastItem?.product.sku } } },
    ssr: false,
  })
  const crossSellItems = useMemo(
    () => filterNonNullableKeys(crosssels.data?.products?.items?.[0]?.crosssell_products),
    [crosssels.data?.products?.items],
  )

  return (
    <>
      <PageMeta
        title={i18n._(/* i18n */ 'Cart ({0})', { 0: data?.cart?.total_quantity ?? 0 })}
        metaRobots={['noindex']}
      />

      <LayoutOverlayHeader
        noAlign
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
        <LayoutTitle size='small' component='span' icon={iconShoppingBag}>
          <Trans id='Cart' />
        </LayoutTitle>
      </LayoutOverlayHeader>

      <WaitForQueries
        waitFor={[cart]}
        fallback={
          <FullPageMessage icon={<CircularProgress />} title='Loading'>
            <Trans id='This may take a second' />
          </FullPageMessage>
        }
      >
        {hasItems ? (
          <>
            <Container maxWidth={false}>
              <ActionCardLayout sx={(theme) => ({ my: theme.spacings.sm })}>
                {cartItems.map((item) => (
                  <ActionCartItem
                    key={item.uid}
                    {...item}
                    size='large'
                    variant='default'
                    details={
                      <RenderType
                        {...item}
                        renderer={{
                          BundleCartItem,
                          ConfigurableCartItem: ConfigurableCartItemOptions,
                          DownloadableCartItem: () => null,
                          SimpleCartItem: () => null,
                          VirtualCartItem: () => null,
                        }}
                      />
                    }
                  />
                ))}
              </ActionCardLayout>

              <CouponAccordion
                key='couponform'
                sx={{ '&:not(.Mui-expanded)': { borderColor: 'transparent' } }}
              />
              <CartTotals />

              <ApolloCartErrorAlert error={error} />

              <CartStartCheckout {...data?.cart} />

              {crossSellItems.length > 0 && (
                <Typography variant='h4' gutterBottom sx={(theme) => ({ my: theme.spacings.sm })}>
                  <Trans id='Have you thought about this yet?' />
                </Typography>
              )}
            </Container>

            {crossSellItems.length > 0 && (
              <ItemScroller sx={{ maxWidth: { md: '80vw' } }}>
                {crossSellItems.map((item) => (
                  <RenderType
                    key={item.uid ?? ''}
                    renderer={productListRenderer}
                    {...item}
                    sizes={responsiveVal(200, 300)}
                  />
                ))}
              </ItemScroller>
            )}
          </>
        ) : (
          <EmptyCart>{error && <ApolloCartErrorAlert error={error} />}</EmptyCart>
        )}
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
