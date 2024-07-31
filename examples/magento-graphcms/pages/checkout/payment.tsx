import {
  ComposedForm,
  WaitForQueries,
  getCheckoutIsDisabled,
  useCheckoutIsAvailableForUser,
} from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import {
  ApolloCartErrorFullPage,
  CartAgreementsForm,
  CartSummary,
  CartTotals,
  EmptyCart,
  useCartQuery,
} from '@graphcommerce/magento-cart'
import { BillingPageDocument } from '@graphcommerce/magento-cart-checkout'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import {
  PaymentMethodButton,
  PaymentMethodPlaceOrder,
  useCartLock,
  PaymentMethodActionCardListForm,
  PaymentMethodContextProvider,
} from '@graphcommerce/magento-cart-payment-method'
import { UnauthenticatedFullPageMessage } from '@graphcommerce/magento-customer/components/WaitForCustomer/UnauthenticatedFullPageMessage'
import { SubscribeToNewsletter } from '@graphcommerce/magento-newsletter'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  FormActions,
  FullPageMessage,
  GetStaticProps,
  iconChevronRight,
  iconId,
  LayoutHeader,
  Stepper,
  IconSvg,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { CircularProgress, Container, Dialog, Typography } from '@mui/material'
import { LayoutDocument, LayoutMinimal, LayoutMinimalProps } from '../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutMinimalProps>

function PaymentPage() {
  const billingPage = useCartQuery(BillingPageDocument, { fetchPolicy: 'cache-and-network' })
  const [{ locked }] = useCartLock()

  const cartExists =
    typeof billingPage.data?.cart !== 'undefined' && (billingPage.data.cart?.items?.length ?? 0) > 0

  const checkoutAvailable = useCheckoutIsAvailableForUser()

  return !checkoutAvailable ? (
    <UnauthenticatedFullPageMessage />
  ) : (
    <ComposedForm>
      <PageMeta title={i18n._(/* i18n */ 'Payment')} metaRobots={['noindex']} />

      <WaitForQueries
        waitFor={[billingPage]}
        fallback={
          <FullPageMessage icon={<CircularProgress />} title={<Trans id='Loading' />}>
            <Trans id='This may take a second' />
          </FullPageMessage>
        }
      >
        {billingPage.error && <ApolloCartErrorFullPage error={billingPage.error} />}
        {!billingPage.error && !cartExists && <EmptyCart />}
        {cartExists && !billingPage.error && (
          <>
            <LayoutHeader
              switchPoint={0}
              primary={
                <PaymentMethodButton
                  type='submit'
                  color='secondary'
                  button={{
                    variant: 'pill',
                    size: 'medium',
                    endIcon: <IconSvg src={iconChevronRight} size='small' />,
                  }}
                  display='inline'
                >
                  <Trans id='Pay' />
                </PaymentMethodButton>
              }
              divider={
                <Container maxWidth='md'>
                  <Stepper steps={3} currentStep={3} />
                </Container>
              }
            >
              <LayoutTitle size='small' icon={iconId}>
                <Trans id='Payment' />
              </LayoutTitle>
            </LayoutHeader>

            <Container maxWidth='md'>
              <Dialog open={!!locked} fullWidth>
                <FullPageMessage
                  disableMargin
                  icon={<CircularProgress />}
                  title={<Trans id='Processing your payment' />}
                >
                  <Trans id='We’re processing your payment, this will take a few seconds.' />
                </FullPageMessage>
              </Dialog>

              <Typography
                variant='h4'
                sx={(theme) => ({ mt: theme.spacings.lg, mb: theme.spacings.sm })}
              >
                <Trans id='Payment method' />
              </Typography>

              <PaymentMethodContextProvider>
                <PaymentMethodActionCardListForm step={4} />

                <CartSummary editable>
                  <CartTotals />
                </CartSummary>

                <CouponAccordion />
                <SubscribeToNewsletter
                  step={3}
                  label={i18n._(
                    /* i18n */ 'Subscribe to our newsletter to stay informed about our new products!',
                  )}
                  sx={(theme) => ({ marginTop: theme.spacings.md })}
                />
                <CartAgreementsForm step={2} sx={{ pt: 0 }} />

                <PaymentMethodPlaceOrder step={5} />

                <FormActions>
                  <PaymentMethodButton
                    id='place-order'
                    type='submit'
                    color='secondary'
                    button={{ variant: 'pill', size: 'large' }}
                    breakpoint='xs'
                    endIcon={<IconSvg src={iconChevronRight} />}
                  >
                    <Trans id='Place order' />
                  </PaymentMethodButton>
                </FormActions>
              </PaymentMethodContextProvider>
            </Container>
          </>
        )}
      </WaitForQueries>
    </ComposedForm>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
}
PaymentPage.pageOptions = pageOptions

export default PaymentPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCheckoutIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)

  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  return {
    props: {
      ...(await layout).data,
      up: { href: '/checkout', title: i18n._(/* i18n */ 'Shipping') },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
