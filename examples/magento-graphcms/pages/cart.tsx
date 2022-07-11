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
import { ActionCartItem, CartItem, CartItems } from '@graphcommerce/magento-cart-items'
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
  FullPageMessage,
  responsiveVal,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Box, Container } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import PageLink from 'next/link'
import { LayoutOverlay, LayoutOverlayProps } from '../components'
import { graphqlSharedClient } from '../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props>

function CartPage() {
  const { data, error, loading } = useCartQuery(CartPageDocument, {
    returnPartialData: true,
    fetchPolicy: 'cache-only',
  })
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
        primary={
          <PageLink href='/checkout' passHref>
            <LinkOrButton
              button={{ variant: 'pill', disabled: !hasItems }}
              link={{ 'aria-disabled': true }}
              color='secondary'
              endIcon={<IconSvg src={iconChevronRight} />}
            >
              <Trans id='Next' />
            </LinkOrButton>
          </PageLink>
        }
        divider={
          <Container maxWidth='md'>
            <Stepper currentStep={hasItems ? 1 : 0} steps={3} />
          </Container>
        }
        switchPoint={0}
      >
        <LayoutTitle size='small' component='span' icon={iconShoppingBag}>
          <Trans id='Cart' />
        </LayoutTitle>
      </LayoutOverlayHeader>

      <Container maxWidth='md' sx={{ minWidth: responsiveVal(320, 800) }}>
        {loading && (
          <FullPageMessage
            disableMargin
            title={<Trans id='Loading cart' />}
            icon={<IconSvg src={iconShoppingBag} size='xxl' />}
          >
            <Trans id='We are fetching your products, one moment please!' />
          </FullPageMessage>
        )}
        {!loading && hasItems && (
          <>
            <Box
              sx={(theme) => ({
                my: theme.spacings.md,
              })}
            >
              <CartItems
                key='cart'
                renderer={{
                  BundleCartItem: ActionCartItem,
                  ConfigurableCartItem: ActionCartItem,
                  DownloadableCartItem: ActionCartItem,
                  SimpleCartItem: ActionCartItem,
                  VirtualCartItem: ActionCartItem,
                }}
              />
            </Box>

            <CouponAccordion
              key='couponform'
              sx={{
                '&:not(.Mui-expanded)': { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 },
              }}
            />
            <CartTotals
              sx={{
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                marginTop: '-1px',
              }}
            />

            <ApolloCartErrorAlert error={error} />
            <CartStartCheckout {...data?.cart} />
          </>
        )}
        {!loading && !hasItems && (
          <EmptyCart>{error && <ApolloCartErrorAlert error={error} />}</EmptyCart>
        )}
      </Container>
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
    sizeSm: 'minimal',
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
