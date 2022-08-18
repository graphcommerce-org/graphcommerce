import { ComposedForm, WaitForQueries } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useGoogleRecaptcha } from '@graphcommerce/googlerecaptcha'
import {
  ApolloCartErrorFullPage,
  CartAgreementsForm,
  CartSummary,
  CartTotals,
  EmptyCart,
  useCartQuery,
  useCurrentCartId,
} from '@graphcommerce/magento-cart'
import { BillingPageDocument } from '@graphcommerce/magento-cart-checkout'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import {
  PaymentMethodButton,
  PaymentMethodContextProvider,
  PaymentMethodPlaceOrder,
  useCartLock,
  PaymentMethodActionCardListForm,
} from '@graphcommerce/magento-cart-payment-method'
import { ApolloCustomerErrorFullPage } from '@graphcommerce/magento-customer'
import { braintree, braintree_local_payment } from '@graphcommerce/magento-payment-braintree'
import { included_methods } from '@graphcommerce/magento-payment-included'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { mollie_methods } from '@graphcommerce/mollie-magento-payment'
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
import { Box, CircularProgress, Container, Dialog, Divider } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import { LayoutMinimal, LayoutMinimalProps } from '../../components'
import { DefaultPageDocument } from '../../graphql/DefaultPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutMinimalProps>

function PaymentPage() {
  useGoogleRecaptcha()

  const billingPage = useCartQuery(BillingPageDocument, { fetchPolicy: 'cache-and-network' })
  const [{ locked }] = useCartLock()

  const cartExists = typeof billingPage.data?.cart !== 'undefined'

  return (
    <ComposedForm>
      <PageMeta title={i18n._(/* i18n */ 'Payment')} metaRobots={['noindex']} />

      <WaitForQueries
        waitFor={[billingPage]}
        fallback={
          <FullPageMessage icon={<CircularProgress />} title='Loading'>
            <Trans id='This may take a second' />
          </FullPageMessage>
        }
      >
        {billingPage.error && <ApolloCartErrorFullPage error={billingPage.error} />}
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
                  title='Processing your payment'
                >
                  <Trans id='We’re processing your payment, this will take a few seconds.' />
                </FullPageMessage>
              </Dialog>

              <PaymentMethodContextProvider
                modules={{
                  braintree_local_payment,
                  braintree,
                  ...included_methods,
                  ...mollie_methods,
                }}
              >
                <AnimatePresence initial={false}>
                  <Box sx={(theme) => ({ mt: theme.spacings.lg })}>
                    <PaymentMethodActionCardListForm step={3} />
                  </Box>

                  <CartSummary editable key='cart-summary'>
                    <Divider />
                    <CartTotals sx={{ typography: 'body1' }} />
                  </CartSummary>

                  <CouponAccordion key='coupon' />

                  <CartAgreementsForm step={2} key='agreements' />

                  <PaymentMethodPlaceOrder key='placeorder' step={4} />

                  <FormActions>
                    <PaymentMethodButton
                      id='place-order'
                      key='button'
                      type='submit'
                      color='secondary'
                      button={{ variant: 'pill', size: 'large' }}
                      breakpoint='xs'
                      endIcon={<IconSvg src={iconChevronRight} />}
                    >
                      <Trans id='Place order' />
                    </PaymentMethodButton>
                  </FormActions>
                </AnimatePresence>
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
  sharedKey: () => 'checkout',
}
PaymentPage.pageOptions = pageOptions

export default PaymentPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)

  const conf = client.query({ query: StoreConfigDocument })

  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `checkout/payment`,
    },
  })

  return {
    props: {
      ...(await page).data,
      up: { href: '/checkout', title: 'Shipping' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
