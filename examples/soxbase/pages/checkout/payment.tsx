import { Container, NoSsr } from '@material-ui/core'
import { ArrowForwardIos } from '@material-ui/icons'
import { PageOptions } from '@reachdigital/framer-next-pages'
import {
  PaymentMethodButton,
  PaymentMethodContextProvider,
  PaymentMethodOptions,
  PaymentMethodToggle,
  PaymentMethodPlaceOrder,
} from '@reachdigital/magento-cart-payment-method'
import { braintree_local_payment } from '@reachdigital/magento-payment-braintree'
import { checkmo, banktransfer, purchaseorder } from '@reachdigital/magento-payment-included'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import {
  CountryRegionsDocument,
  CountryRegionsQuery,
} from '@reachdigital/magento-store/CountryRegions.gql'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { ComposedForm } from '@reachdigital/react-hook-form'
import ComposedSubmit from '@reachdigital/react-hook-form/src/ComposedForm/ComposedSubmit'
import clsx from 'clsx'
import { AnimatePresence } from 'framer-motion'
import React, { useRef } from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function PaymentPage(props: Props) {
  const formClasses = useFormStyles()

  return (
    <Container maxWidth='md'>
      <ComposedForm>
        <PaymentMethodContextProvider
          modules={{ braintree_local_payment, checkmo, banktransfer, purchaseorder }}
        >
          <PageMeta title='Payment' metaDescription='Cart Items' metaRobots={['noindex']} />

          <NoSsr>
            <AnimatePresence initial={false}>
              <PaymentMethodToggle key='toggle' />

              <PaymentMethodOptions
                key='options'
                step={1}
                Container={({ children }) => (
                  <div className={clsx(formClasses.form, formClasses.formContained)}>
                    {children}
                  </div>
                )}
              />

              <PaymentMethodPlaceOrder key='placeorder' step={2} />

              <PaymentMethodButton
                key='button'
                type='submit'
                color='secondary'
                variant='pill'
                size='large'
                endIcon={<ArrowForwardIos fontSize='inherit' />}
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
    },
  }
}
