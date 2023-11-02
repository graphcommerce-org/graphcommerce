import {
  ComposedSubmitButton,
  ComposedSubmitLinkOrButton,
  ComposedForm,
  ComposedSubmit,
  WaitForQueries,
} from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  ApolloCartErrorAlert,
  ApolloCartErrorFullPage,
  EmptyCart,
  useCartQuery,
} from '@graphcommerce/magento-cart'
import { ShippingPageDocument } from '@graphcommerce/magento-cart-checkout'
import { EmailForm } from '@graphcommerce/magento-cart-email'
import {
  ShippingAddressForm,
  CustomerAddressForm,
} from '@graphcommerce/magento-cart-shipping-address'
import { ShippingMethodForm } from '@graphcommerce/magento-cart-shipping-method'
import {
  AddressFields,
  CustomerDocument,
  NameFields,
  TelephoneField,
  useCustomerQuery,
} from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  FormActions,
  GetStaticProps,
  iconBox,
  LayoutHeader,
  Stepper,
  LayoutTitle,
  FullPageMessage,
  iconAddresses,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { CircularProgress, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { LayoutDocument, LayoutMinimal, LayoutMinimalProps } from '../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutMinimalProps, Props>

function ShippingPage() {
  const router = useRouter()
  const shippingPage = useCartQuery(ShippingPageDocument, { fetchPolicy: 'cache-and-network' })
  const customerAddresses = useCustomerQuery(CustomerDocument, { fetchPolicy: 'cache-and-network' })

  const cartExists =
    typeof shippingPage.data?.cart !== 'undefined' &&
    (shippingPage.data.cart?.items?.length ?? 0) > 0

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Shipping')} metaRobots={['noindex']} />
      <WaitForQueries
        waitFor={[shippingPage, customerAddresses]}
        fallback={
          <FullPageMessage icon={<CircularProgress />} title={<Trans id='Loading' />}>
            <Trans id='This may take a second' />
          </FullPageMessage>
        }
      >
        {shippingPage.error && <ApolloCartErrorFullPage error={shippingPage.error} />}
        {!shippingPage.error && !cartExists && <EmptyCart />}
        {!shippingPage.error && cartExists && (
          <ComposedForm>
            <LayoutHeader
              switchPoint={0}
              primary={
                <ComposedSubmit
                  onSubmitSuccessful={() => router.push('/checkout/payment')}
                  render={(renderProps) => (
                    <ComposedSubmitLinkOrButton {...renderProps}>
                      <Trans id='Next' />
                    </ComposedSubmitLinkOrButton>
                  )}
                />
              }
              divider={
                <Container maxWidth='md'>
                  <Stepper currentStep={2} steps={3} />
                </Container>
              }
            >
              {shippingPage.data?.cart?.is_virtual ? (
                <LayoutTitle size='small' icon={iconAddresses}>
                  <Trans id='Billing address' />
                </LayoutTitle>
              ) : (
                <LayoutTitle size='small' icon={iconBox}>
                  <Trans id='Shipping' />
                </LayoutTitle>
              )}
            </LayoutHeader>
            <Container maxWidth='md'>
              <>
                {(customerAddresses.data?.customer?.addresses?.length ?? 0) >= 1 ? (
                  <CustomerAddressForm step={2} sx={(theme) => ({ mt: theme.spacings.lg })}>
                    <ShippingAddressForm ignoreCache step={3}>
                      <NameFields />
                      <AddressFields />
                      <TelephoneField />
                      <ApolloCartErrorAlert />
                    </ShippingAddressForm>
                  </CustomerAddressForm>
                ) : (
                  <>
                    <Typography
                      variant='h4'
                      gutterBottom
                      sx={(theme) => ({ mt: theme.spacings.lg, mb: theme.spacings.sm })}
                    >
                      <Trans id='Personal details' />
                    </Typography>
                    <EmailForm step={1} />
                    <ShippingAddressForm step={3}>
                      <NameFields />
                      <AddressFields />
                      <TelephoneField />
                      <ApolloCartErrorAlert />
                    </ShippingAddressForm>
                  </>
                )}

                {!shippingPage.data?.cart?.is_virtual && (
                  <ShippingMethodForm step={4} sx={(theme) => ({ mt: theme.spacings.lg })} />
                )}

                <ComposedSubmit
                  onSubmitSuccessful={() => router.push('/checkout/payment')}
                  render={(renderProps) => (
                    <>
                      <FormActions>
                        <ComposedSubmitButton {...renderProps} size='large' id='next'>
                          <Trans id='Next' />
                        </ComposedSubmitButton>
                      </FormActions>
                      <ApolloCartErrorAlert
                        error={renderProps.buttonState.isSubmitting ? undefined : renderProps.error}
                      />
                    </>
                  )}
                />
              </>
            </Container>
          </ComposedForm>
        )}
      </WaitForQueries>
    </>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
}
ShippingPage.pageOptions = pageOptions

export default ShippingPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const staticClient = graphqlSsrClient(locale)

  const layout = staticClient.query({ query: LayoutDocument, fetchPolicy: 'cache-first' })

  return {
    props: {
      ...(await layout).data,
      up: { href: '/cart', title: 'Cart' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
