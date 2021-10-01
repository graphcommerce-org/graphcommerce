import { PageOptions } from '@graphcommerce/framer-next-pages'
import { CartSummary, CartTotals } from '@graphcommerce/magento-cart'
import { PaymentAgreementsForm } from '@graphcommerce/magento-cart-checkout'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import {
  PaymentMethodButton,
  PaymentMethodContextProvider,
  PaymentMethodOptions,
  PaymentMethodPlaceOrder,
  PaymentMethodToggle,
} from '@graphcommerce/magento-cart-payment-method'
import { braintree, braintree_local_payment } from '@graphcommerce/magento-payment-braintree'
import { included_methods } from '@graphcommerce/magento-payment-included'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { mollie_methods } from '@graphcommerce/mollie-magento-payment'
import {
  AppShellTitle,
  FormDiv,
  GetStaticProps,
  iconChevronRight,
  iconId,
  PageShellHeader,
  Stepper,
  SvgImage,
  Title,
} from '@graphcommerce/next-ui'
import { ComposedForm } from '@graphcommerce/react-hook-form'
import { Container, Divider, NoSsr } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import MinimalPageShell from '../../components/AppShell/MinimalPageShell'
import { SheetShellProps } from '../../components/AppShell/SheetShell'
import { DefaultPageDocument } from '../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function PaymentPage() {
  return (
    <ComposedForm>
      <PageMeta title='Payment' metaDescription='Payment' metaRobots={['noindex']} />
      <PageShellHeader
        primary={
          <PaymentMethodButton
            type='submit'
            color='secondary'
            variant='pill-link'
            display='inline'
            endIcon={
              <SvgImage
                src={iconChevronRight}
                loading='eager'
                alt='chevron right'
                size='small'
                shade='inverted'
              />
            }
          >
            Pay
          </PaymentMethodButton>
        }
        divider={
          <Container maxWidth='md'>
            <Stepper steps={3} currentStep={3} />
          </Container>
        }
        backFallbackHref='/cart'
        backFallbackTitle='Cart'
      >
        <Title size='small' icon={iconId}>
          Payment
        </Title>
      </PageShellHeader>
      <Container maxWidth='md'>
        <AppShellTitle icon={iconId}>Payment</AppShellTitle>

        <PaymentMethodContextProvider
          modules={{
            braintree_local_payment,
            braintree,
            ...included_methods,
            ...mollie_methods,
          }}
        >
          <NoSsr>
            <AnimatePresence initial={false}>
              <PaymentMethodToggle key='toggle' />

              <PaymentMethodOptions
                key='options'
                step={1}
                Container={({ children }) => (
                  <FormDiv contained background='secondary'>
                    {children}
                  </FormDiv>
                )}
              />

              <PaymentMethodPlaceOrder key='placeorder' step={2} />

              <CartSummary editable key='cart-summary'>
                <Divider />
                <CartTotals />
              </CartSummary>

              <CouponAccordion key='coupon' />

              <PaymentAgreementsForm step={2} key='payment-agreements' />

              <PaymentMethodButton
                key='button'
                type='submit'
                color='secondary'
                variant='pill'
                size='large'
                text='bold'
                endIcon={
                  <SvgImage
                    src={iconChevronRight}
                    loading='eager'
                    alt='chevron right'
                    size='small'
                    shade='inverted'
                  />
                }
              >
                Place order
              </PaymentMethodButton>
            </AnimatePresence>
          </NoSsr>
        </PaymentMethodContextProvider>
      </Container>
    </ComposedForm>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  SharedComponent: MinimalPageShell,
  sharedKey: () => 'checkout',
}
PaymentPage.pageOptions = pageOptions

export default PaymentPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })

  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `checkout/payment`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      ...(await page).data,
      apolloState: await conf.then(() => client.cache.extract()),
      backFallbackHref: '/checkout',
      backFallbackTitle: 'Shipping',
    },
  }
}
