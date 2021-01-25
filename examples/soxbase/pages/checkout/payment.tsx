import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { ArrowForwardIos } from '@material-ui/icons'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import { ClientCartDocument } from '@reachdigital/magento-cart/ClientCart.gql'
import {
  CountryRegionsDocument,
  CountryRegionsQuery,
} from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import CartPaymentMethods from '@reachdigital/magento-cart/payment-method/CartPaymentMethods'
import * as BraintreeLocalPayment from '@reachdigital/magento-payment-braintree/BraintreeLocalPayment'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import AnimatedRow from '@reachdigital/next-ui/AnimatedForm/AnimatedRow'
import useFormStyles from '@reachdigital/next-ui/AnimatedForm/useFormStyles'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
import Button from '@reachdigital/next-ui/Button'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { AnimatePresence } from 'framer-motion'
import React, { useRef } from 'react'
import apolloClient from '../../lib/apolloClient'

type Props = CountryRegionsQuery
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props>

function PaymentPage({ countries }: Props) {
  const classes = useFormStyles()
  const addressForm = useRef<() => Promise<boolean>>()
  const methodForm = useRef<() => Promise<boolean>>()
  const { data: clientCart } = useQuery(ClientCartDocument)
  const forceSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      if (!addressForm.current || !methodForm.current) return
      await Promise.all([addressForm.current(), methodForm.current()])
    })()
  }

  return (
    <BottomDrawerUi title='Payment' fullHeight>
      <PageMeta title='Payment' metaDescription='Cart Items' metaRobots='NOINDEX, FOLLOW' />
      <Container maxWidth='md'>
        <NoSsr>
          <AnimatePresence initial={false}>
            <CartPaymentMethods
              available_payment_methods={clientCart?.cart?.available_payment_methods}
              renderers={{
                braintree_local_payment: BraintreeLocalPayment,
              }}
            />
            <AnimatedRow className={classes.formRow} key='next'>
              <Button
                type='submit'
                color='secondary'
                variant='pill'
                size='large'
                onClick={forceSubmit}
              >
                Next <ArrowForwardIos fontSize='inherit' />
              </Button>
            </AnimatedRow>
          </AnimatePresence>
        </NoSsr>
      </Container>
    </BottomDrawerUi>
  )
}

PaymentPage.Layout = PageLayout

registerRouteUi('/checkout/payment', BottomDrawerUi)

export default PaymentPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))

  const config = client.query({ query: StoreConfigDocument })
  const pageLayout = staticClient.query({ query: PageLayoutDocument })
  const countryRegions = staticClient.query({ query: CountryRegionsDocument })

  await config
  return {
    props: {
      ...(await pageLayout).data,
      ...(await countryRegions).data,
      apolloState: client.cache.extract(),
    },
  }
}
