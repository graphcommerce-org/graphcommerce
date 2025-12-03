// managed by: local
// to modify this file, change it to managed by: local

import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import {
  ApolloCartErrorAlert,
  CartIdProvider,
  CartStartCheckoutLinkOrButton,
  CartTotals,
} from '@graphcommerce/magento-cart'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import { CartCrosssellsScroller, CartItemsActionCards } from '@graphcommerce/magento-cart-items'
// eslint-disable-next-line import/no-extraneous-dependencies
import {
  MultiCartCreateForm,
  MultiCartMoveToOtherCartGroup,
  MultiCartPageDocument,
  MultiCartStartCheckout,
  MultiCartTabs,
  useMultiCartIcon,
  type MultiCartGroupConfigFragment,
} from '@graphcommerce/magento-multi-cart'
import { Money, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  Button,
  Container,
  FullPageMessage,
  iconRedo,
  iconShoppingBag,
  IconSvg,
  LayoutOverlayHeader2,
  LayoutTitle,
  MediaQuery,
  nonNullable,
  OverlayCloseButton,
  OverlayStickyBottom,
  responsiveVal,
  type GetStaticProps,
} from '@graphcommerce/next-ui'
import { Trans } from '@lingui/react/macro'
import { Box, CircularProgress, darken } from '@mui/material'
import type { GetStaticPaths } from 'next'
import type { LayoutOverlayProps } from '../../components'
import { LayoutOverlay, productListRenderer } from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type Props = { config: MultiCartGroupConfigFragment }
type RouteProps = { group: string }
type GetPageStaticPaths = GetStaticPaths<RouteProps>
type GetPageStaticProps = GetStaticProps<LayoutOverlayProps, Props, RouteProps>

// All URLs to /cart need to be redirected to /mc/cart or something?
// All Cart actions like edit item, remove item, etc. need to be done on the correct cart.

function MultiCartPage(props: Props) {
  const { config } = props
  const query = useQuery(MultiCartPageDocument, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-and-network',
    variables: { init: {}, configId: config.id },
  })

  const multiCart = query.data?.multiCart.multi_cart
  const group = multiCart?.groups.filter(nonNullable).find((g) => g.config.id === config.id)
  const carts = (group?.carts ?? []).filter(nonNullable)
  const cart = group?.selected_cart

  const totalQuantity = cart?.total_quantity ?? 0
  const hasItems =
    group && totalQuantity > 0 && typeof cart?.prices?.grand_total?.value !== 'undefined'
  const simpleHeader = !config.allow_multiple

  const canMoveTo = (config.can_move_cart_to ?? []).filter(nonNullable)
  const canBecomeReal = config.can_become_real ?? false
  const canViewTotals = config.can_view_totals ?? false
  const canViewAdditional = config.can_view_additional ?? false

  const icon = useMultiCartIcon({ config })

  console.log(simpleHeader)

  return (
    <CartIdProvider cartId={cart?.id}>
      <PageMeta
        title={config.allow_multiple ? config.title_plural : config.title}
        metaRobots={['noindex']}
      />

      {!simpleHeader ? (
        <LayoutOverlayHeader2
          closeLocation='left'
          disableChildrenPadding
          sx={(theme) => ({
            bgcolor: darken(theme.palette.background.default, 0.03),
            '& .LayoutHeaderClose-root': {
              bgcolor: darken(theme.palette.background.default, 0.03),
            },
          })}
          justify='start'
        >
          {group && (
            <MultiCartTabs
              config={config}
              group={group}
              color={(theme) => theme.palette.background.paper}
              variant='chrome'
              spacing={responsiveVal(4, 15, 320, 1024)}
            />
          )}
        </LayoutOverlayHeader2>
      ) : (
        <LayoutOverlayHeader2
          primary={<CartStartCheckoutLinkOrButton cart={cart} disabled={!!query.error} />}
          sx={(theme) => ({
            boxShadow: 1,
            bgcolor: theme.palette.background.paper,
            '& .LayoutHeaderClose-root': { bgcolor: theme.palette.background.paper },
          })}
        >
          <LayoutTitle size='small' component='span' icon={hasItems ? iconShoppingBag : undefined}>
            {hasItems && (
              <Trans>
                Total <Money {...cart?.prices?.grand_total} />
              </Trans>
            )}
            {!hasItems && (config.allow_multiple ? config.title_plural : config.title)}
          </LayoutTitle>
        </LayoutOverlayHeader2>
      )}
      <WaitForQueries
        waitFor={query}
        fallback={
          <FullPageMessage icon={<CircularProgress />} title={<Trans>Loading</Trans>}>
            <Trans>This may take a second</Trans>
          </FullPageMessage>
        }
      >
        {hasItems && (
          <>
            {!simpleHeader && (
              <Container
                maxWidth='md'
                sx={(theme) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  py: theme.spacings.xs,
                })}
              >
                {config.can_move_cart_to.filter(nonNullable).map((configIdTo) => (
                  <MultiCartMoveToOtherCartGroup
                    cart={cart}
                    configFrom={config}
                    configIdTo={configIdTo}
                    render={({ btnProps, configTo, loading }) => (
                      <Button
                        {...btnProps}
                        size='medium'
                        loading={loading}
                        startIcon={<IconSvg src={iconRedo} size='medium' />}
                      >
                        Convert to {configTo.title}
                      </Button>
                    )}
                  />
                ))}

                {config.can_become_real && (
                  <MediaQuery query={(theme) => theme.breakpoints.up('md')}>
                    <MultiCartStartCheckout
                      cart={cart}
                      disabled={!!query.error}
                      sx={{ my: 0, ml: 'auto' }}
                      // hideTotal
                      buttonProps={{ size: 'medium' }}
                    />
                  </MediaQuery>
                )}
              </Container>
            )}

            <Container maxWidth='md'>
              <CartItemsActionCards
                cart={cart}
                sx={(theme) => ({ position: 'relative', zIndex: 'unset', mb: theme.spacings.md })}
              />
              {config.can_view_totals && <CouponAccordion key='couponform' />}
              {config.can_view_totals && (
                <CartTotals containerMargin sx={{ typography: 'body1' }} />
              )}
              <ApolloCartErrorAlert error={query.error} />
            </Container>
            {config.can_view_additional && (
              <CartCrosssellsScroller
                renderer={productListRenderer}
                sx={(theme) => ({ mt: theme.spacings.md })}
              />
            )}
            {config.can_become_real && (
              <OverlayStickyBottom sx={{ py: 0.1 }}>
                <MultiCartStartCheckout cart={cart} disabled={!!query.error} />
              </OverlayStickyBottom>
            )}
          </>
        )}

        {!hasItems && carts.length === 0 && group && (
          <FullPageMessage
            disableMargin
            title={<Trans>You do not have any {config.title} yet</Trans>}
            button={
              <MultiCartCreateForm
                config={config}
                render={({ buttonProps, loading }) => (
                  <Button
                    {...buttonProps}
                    loading={loading}
                    variant='pill'
                    color='secondary'
                    size='large'
                  >
                    <Trans>New {config.title}</Trans>
                  </Button>
                )}
              />
            }
            icon={<IconSvg src={icon} size='xxl' />}
          />
        )}
        {!hasItems && cart && (
          <FullPageMessage
            disableMargin
            title={config.title}
            icon={<IconSvg src={icon} size='xxl' />}
            button={
              <OverlayCloseButton variant='pill' color='secondary' size='large'>
                <Trans>Continue shopping</Trans>
              </OverlayCloseButton>
            }
          >
            {query.error ? (
              <ApolloCartErrorAlert error={query.error} />
            ) : (
              <Trans>
                You have not added any items to {cart.multi_cart?.title ?? config.title}
              </Trans>
            )}
          </FullPageMessage>
        )}
      </WaitForQueries>
    </CartIdProvider>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'cart',
  Layout: LayoutOverlay,
}
MultiCartPage.pageOptions = pageOptions

export default MultiCartPage

export const getStaticPaths: GetPageStaticPaths = async ({ locales = [] }) => {
  const responses = locales.map(async (locale) => {
    const staticClient = graphqlSsrClient({ locale })
    const conf = staticClient.query({ query: StoreConfigDocument })
    const groups = (await conf).data.storeConfig?.multi_cart_groups ?? []
    return groups.filter(nonNullable).map((group) => ({ params: { group: group.id }, locale }))
  })

  const paths = (await Promise.all(responses)).flat(1)
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetPageStaticProps = async (context) => {
  const groupSlug = context.params?.group ?? 'cart'
  if (!groupSlug) return { notFound: true }

  const client = graphqlSharedClient(context)
  const conf = client.query({ query: StoreConfigDocument })

  const groups = (await conf).data.storeConfig?.multi_cart_groups ?? []

  const groupConfig = groups.filter(nonNullable).find((g) => g.id === groupSlug)
  if (!groupConfig) return { notFound: true }

  return {
    props: {
      config: groupConfig,
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'right',
      variantSm: 'bottom',
      widthMd: '900px',
      sizeMd: 'floating',
      sizeSm: 'full',
      justifyMd: 'start',
    },
  }
}
