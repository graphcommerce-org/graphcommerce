import {
  ComposedSubmitButton,
  ComposedSubmitLinkOrButton,
  ComposedForm,
  ComposedSubmit,
} from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useGoogleRecaptcha } from '@graphcommerce/googlerecaptcha'
import { useQuery } from '@graphcommerce/graphql'
import { ApolloCartErrorAlert, EmptyCart, useCartQuery } from '@graphcommerce/magento-cart'
import { ShippingPageDocument } from '@graphcommerce/magento-cart-checkout'
import { EmailForm } from '@graphcommerce/magento-cart-email'
import { ShippingAddressForm } from '@graphcommerce/magento-cart-shipping-address'
import { CustomerAddressForm } from '@graphcommerce/magento-cart-shipping-address/components/CustomerAddressForm/CustomerAddressForm'
import { ShippingMethodForm } from '@graphcommerce/magento-cart-shipping-method'
import { CustomerDocument } from '@graphcommerce/magento-customer'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  FormActions,
  FormHeader,
  GetStaticProps,
  iconBox,
  LayoutHeader,
  Stepper,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { LayoutMinimal, LayoutMinimalProps } from '../../components'
import { DefaultPageDocument } from '../../graphql/DefaultPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutMinimalProps, Props>

function ShippingPage() {
  useGoogleRecaptcha()
  const { data: cartData } = useCartQuery(ShippingPageDocument, {
    returnPartialData: true,
    fetchPolicy: 'cache-and-network',
    ssr: false,
  })

  const cartExists = typeof cartData?.cart !== 'undefined'
  const router = useRouter()

  const onSubmitSuccessful = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    router.push('/checkout/payment')
  }

  const customerAddresses = useQuery(CustomerDocument)
  const addresses = customerAddresses.data?.customer?.addresses

  return (
    <ComposedForm>
      <PageMeta title={t`Checkout`} metaDescription={t`Cart Items`} metaRobots={['noindex']} />
      <LayoutHeader
        primary={
          <ComposedSubmit
            onSubmitSuccessful={onSubmitSuccessful}
            render={(renderProps) => (
              <ComposedSubmitLinkOrButton {...renderProps}>
                <Trans>Next</Trans>
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
        <LayoutTitle size='small' icon={iconBox}>
          <Trans>Shipping</Trans>
        </LayoutTitle>
      </LayoutHeader>
      <Container maxWidth='md'>
        <NoSsr>
          {!cartExists && <EmptyCart />}

          {cartExists && (
            <>
              <LayoutTitle icon={iconBox}>
                <Trans>Shipping</Trans>
              </LayoutTitle>
              {addresses ? (
                <CustomerAddressForm step={2}>
                  <ShippingAddressForm ignoreCache step={3} />
                </CustomerAddressForm>
              ) : (
                <>
                  <EmailForm step={1} />
                  <ShippingAddressForm step={3} />
                </>
              )}

              <FormHeader variant='h5'>
                <Trans>Shipping method</Trans>
              </FormHeader>

              <ShippingMethodForm step={4} />

              <ComposedSubmit
                onSubmitSuccessful={onSubmitSuccessful}
                render={(renderProps) => (
                  <>
                    <FormActions>
                      <ComposedSubmitButton {...renderProps} size='large' id='next'>
                        <Trans>Next</Trans>
                      </ComposedSubmitButton>
                    </FormActions>
                    <ApolloCartErrorAlert
                      error={renderProps.buttonState.isSubmitting ? undefined : renderProps.error}
                    />
                  </>
                )}
              />
            </>
          )}
        </NoSsr>
      </Container>
    </ComposedForm>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
  sharedKey: () => 'checkout',
}
ShippingPage.pageOptions = pageOptions

export default ShippingPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const staticClient = graphqlSsrClient(locale)

  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `checkout`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      ...(await page).data,
      up: { href: '/cart', title: 'Cart' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
