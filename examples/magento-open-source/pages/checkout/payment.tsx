import { ComposedForm, WaitForQueries } from '@graphcommerce/ecommerce-ui'
import type { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import {
  ApolloCartErrorFullPage,
  CartAgreementsForm,
  CartSummary,
  CartTotals,
  EmptyCart,
  getCheckoutIsDisabled,
  useCartQuery,
} from '@graphcommerce/magento-cart'
import { BillingPageDocument } from '@graphcommerce/magento-cart-checkout'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import {
  PaymentMethodActionCardListForm,
  PaymentMethodButton,
  PaymentMethodContextProvider,
  PaymentMethodPlaceOrder,
  useCartLock,
} from '@graphcommerce/magento-cart-payment-method'
import { SubscribeToNewsletter } from '@graphcommerce/magento-newsletter'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  FormActions,
  FullPageMessage,
  iconChevronRight,
  iconId,
  IconSvg,
  LayoutHeader,
  LayoutTitle,
  Stepper,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { CircularProgress, Container, Dialog, Typography } from '@mui/material'
import type { LayoutMinimalProps } from '../../components'
import { LayoutDocument, LayoutMinimal } from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutMinimalProps>

function PaymentPage() {
  const billingPage = useCartQuery(BillingPageDocument, { fetchPolicy: 'cache-and-network' })
  const [{ locked }] = useCartLock()

  const cartExists =
    typeof billingPage.data?.cart !== 'undefined' && (billingPage.data.cart?.items?.length ?? 0) > 0

  return (
    <ComposedForm>
      <PageMeta title={t`Payment`} metaRobots={['noindex']} />

      <WaitForQueries
        waitFor={[billingPage]}
        fallback={
          <FullPageMessage icon={<CircularProgress />} title={<Trans>Loading</Trans>}>
            <Trans>This may take a second</Trans>
          </FullPageMessage>
        }
      >
        {billingPage.error && <ApolloCartErrorFullPage error={billingPage.error} />}
        {!billingPage.error && !cartExists && <EmptyCart disableMargin />}
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
                  <Trans>Pay</Trans>
                </PaymentMethodButton>
              }
              divider={
                <Container maxWidth='md'>
                  <Stepper steps={3} currentStep={3} />
                </Container>
              }
            >
              <LayoutTitle size='small' icon={iconId}>
                <Trans>Payment</Trans>
              </LayoutTitle>
            </LayoutHeader>

            <Container maxWidth='md'>
              <Dialog open={!!locked} fullWidth>
                <FullPageMessage
                  disableMargin
                  icon={<CircularProgress />}
                  title={<Trans>Processing your payment</Trans>}
                >
                  <Trans>We’re processing your payment, this will take a few seconds.</Trans>
                </FullPageMessage>
              </Dialog>

              <Typography
                variant='h4'
                sx={(theme) => ({ mt: theme.spacings.lg, mb: theme.spacings.sm })}
              >
                <Trans>Payment method</Trans>
              </Typography>

              <PaymentMethodContextProvider>
                <PaymentMethodActionCardListForm step={4} />

                <CartSummary editable>
                  <CartTotals />
                </CartSummary>

                <CouponAccordion />
                <SubscribeToNewsletter
                  step={3}
                  label={t`Subscribe to our newsletter to stay informed about our new products!`}
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
                    <Trans>Place order</Trans>
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
      up: { href: '/checkout', title: t`Shipping` },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
