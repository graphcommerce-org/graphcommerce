import { ComposedForm } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  CartAgreementsForm,
  CartSummary,
  CartTotals,
  EmptyCart,
  useCurrentCartId,
} from '@graphcommerce/magento-cart'
import { CouponAccordion } from '@graphcommerce/magento-cart-coupon'
import {
  PaymentMethodButton,
  PaymentMethodContextProvider,
  PaymentMethodOptions,
  PaymentMethodPlaceOrder,
  PaymentMethodToggles,
  useCartLock,
} from '@graphcommerce/magento-cart-payment-method'
import { braintree, braintree_local_payment } from '@graphcommerce/magento-payment-braintree'
import { included_methods } from '@graphcommerce/magento-payment-included'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import { mollie_methods } from '@graphcommerce/mollie-magento-payment'
import {
  FormActions,
  FormDiv,
  FullPageMessage,
  GetStaticProps,
  iconChevronRight,
  iconId,
  LayoutHeader,
  Stepper,
  IconSvg,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { CircularProgress, Container, Dialog, Divider, NoSsr } from '@mui/material'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { LayoutMinimal, LayoutMinimalProps } from '../../components'
import { DefaultPageDocument } from '../../graphql/DefaultPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutMinimalProps>

function PaymentPage() {
  const cartId = useCurrentCartId()
  const { locked } = useCartLock()

  return (
    <ComposedForm>
      <PageMeta title={t`Payment`} metaDescription='Payment' metaRobots={['noindex']} />
      <NoSsr>
        {!cartId && <EmptyCart />}
        {cartId && (
          <>
            <LayoutHeader
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
              <Dialog open={locked} fullWidth>
                <FullPageMessage
                  disableMargin
                  icon={<CircularProgress />}
                  title='Processing your payment'
                >
                  <Trans>We're processing your payment, this will take a few seconds.</Trans>
                </FullPageMessage>
              </Dialog>

              <>
                <LayoutTitle icon={iconId}>
                  <Trans>Payment</Trans>
                </LayoutTitle>

                <PaymentMethodContextProvider
                  modules={{
                    braintree_local_payment,
                    braintree,
                    ...included_methods,
                    ...mollie_methods,
                  }}
                >
                  <AnimatePresence initial={false}>
                    <PaymentMethodToggles key='toggle' step={1} />

                    <PaymentMethodOptions
                      key='options'
                      step={2}
                      Container={React.memo(({ children }) => (
                        <FormDiv contained background='secondary'>
                          {children}
                        </FormDiv>
                      ))}
                    />

                    <CartSummary editable key='cart-summary'>
                      <Divider />
                      <CartTotals />
                    </CartSummary>

                    <CouponAccordion key='coupon' />

                    <CartAgreementsForm step={3} key='agreements' />

                    <PaymentMethodPlaceOrder key='placeorder' step={4} />

                    <FormActions>
                      <PaymentMethodButton
                        key='button'
                        type='submit'
                        color='secondary'
                        button={{ variant: 'pill', size: 'large' }}
                        breakpoint='xs'
                        endIcon={<IconSvg src={iconChevronRight} />}
                      >
                        <Trans>Place order</Trans>
                      </PaymentMethodButton>
                    </FormActions>
                  </AnimatePresence>
                </PaymentMethodContextProvider>
              </>
            </Container>
          </>
        )}
      </NoSsr>
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
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
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
