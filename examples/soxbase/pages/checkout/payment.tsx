import { Container, NoSsr, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import {
  PaymentMethodButton,
  PaymentMethodContextProvider,
  PaymentMethodOptions,
  PaymentMethodPlaceOrder,
  PaymentMethodToggle,
} from '@reachdigital/magento-cart-payment-method'
import { braintree_local_payment } from '@reachdigital/magento-payment-braintree'
import { included_methods } from '@reachdigital/magento-payment-included'
import { mollie_methods } from '@reachdigital/magento-payment-mollie'
import { CountryRegionsDocument, PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import Form from '@reachdigital/next-ui/Form'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import Stepper from '@reachdigital/next-ui/Stepper/Stepper'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconChevronRight } from '@reachdigital/next-ui/icons'
import { ComposedForm } from '@reachdigital/react-hook-form'
import { AnimatePresence } from 'framer-motion'
import React from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function PaymentPage(props: Props) {
  return (
    <Container maxWidth='md'>
      <ComposedForm>
        <Typography variant='h5' component='h1' align='center'>
          Checkout
        </Typography>

        <Stepper steps={3} currentStep={3} />

        <PaymentMethodContextProvider
          modules={{
            braintree_local_payment,
            ...included_methods,
            ...mollie_methods,
          }}
        >
          <PageMeta title='Payment' metaDescription='Cart Items' metaRobots={['noindex']} />

          <NoSsr>
            <AnimatePresence initial={false}>
              <PaymentMethodToggle key='toggle' />

              <PaymentMethodOptions
                key='options'
                step={1}
                Container={({ children }) => (
                  <Form component='div' contained>
                    {children}
                  </Form>
                )}
              />

              <PaymentMethodPlaceOrder key='placeorder' step={2} />

              <PaymentMethodButton
                key='button'
                type='submit'
                color='secondary'
                variant='pill'
                size='large'
                endIcon={<SvgImage src={iconChevronRight} loading='eager' alt='chevron right' />}
              >
                Pay
              </PaymentMethodButton>
            </AnimatePresence>
          </NoSsr>
        </PaymentMethodContextProvider>
      </ComposedForm>
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'checkout',
  SharedComponent: SheetShell,
  sharedKey: () => 'checkout',
  sharedProps: { variant: 'bottom', size: 'max' },
}
PaymentPage.pageOptions = pageOptions

export default PaymentPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })
  const countryRegions = staticClient.query({ query: CountryRegionsDocument })

  return {
    props: {
      ...(await countryRegions).data,
      apolloState: await conf.then(() => client.cache.extract()),
      backFallbackHref: '/checkout',
      backFallbackTitle: 'Shipping',
    },
  }
}
