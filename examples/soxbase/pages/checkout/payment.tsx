import { Container, NoSsr } from '@material-ui/core'
import { ArrowForwardIos } from '@material-ui/icons'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { BillingAddressForm } from '@reachdigital/magento-cart-billing-address'
import {
  PaymentMethodButton,
  PaymentMethodContextProvider,
  PaymentMethodError,
  PaymentMethodOptions,
  PaymentMethodToggle,
} from '@reachdigital/magento-cart-payment-method'
import { braintree_local_payment } from '@reachdigital/magento-payment-braintree'
import { checkmo } from '@reachdigital/magento-payment-included'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import {
  CountryRegionsDocument,
  CountryRegionsQuery,
} from '@reachdigital/magento-store/CountryRegions.gql'
import AnimatedRow from '@reachdigital/next-ui/AnimatedRow'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { ComposedForm } from '@reachdigital/react-hook-form'
import { AnimatePresence } from 'framer-motion'
import React, { useRef } from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'

type Props = CountryRegionsQuery
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function PaymentPage({ countries }: Props) {
  const classes = useFormStyles()
  const addressForm = useRef<() => Promise<boolean>>()
  const methodForm = useRef<() => Promise<boolean>>()
  const forceSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      if (!addressForm.current || !methodForm.current) return
      await Promise.all([addressForm.current(), methodForm.current()])
    })()
  }

  return (
    <Container maxWidth='md'>
      <ComposedForm>
        <PaymentMethodContextProvider modules={{ braintree_local_payment, checkmo }}>
          <PageMeta title='Payment' metaDescription='Cart Items' metaRobots={['noindex']} />

          <NoSsr>
            <AnimatePresence initial={false}>
              <PaymentMethodToggle key='toggle' />

              <PaymentMethodOptions key='options' />

              <PaymentMethodError key='error' />

              <BillingAddressForm />

              <AnimatedRow className={classes.formRow} key='next'>
                <div className={classes.formRow}>
                  <PaymentMethodButton
                    key='button'
                    type='submit'
                    color='secondary'
                    variant='pill'
                    size='large'
                    onClick={forceSubmit}
                    endIcon={<ArrowForwardIos fontSize='inherit' />}
                  >
                    Pay
                  </PaymentMethodButton>
                </div>
              </AnimatedRow>
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
