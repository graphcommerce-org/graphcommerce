import { Container, NoSsr } from '@material-ui/core'
import { ArrowForwardIos } from '@material-ui/icons'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import CheckoutStepper from '@reachdigital/magento-cart/cart/CheckoutStepper'
import {
  CountryRegionsDocument,
  CountryRegionsQuery,
} from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import EmailForm from '@reachdigital/magento-cart/email/EmailForm'
import ShippingMethodForm from '@reachdigital/magento-cart/shipping-method/ShippingMethodForm'
import ShippingAddressForm from '@reachdigital/magento-cart/shipping/ShippingAddressForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import Button from '@reachdigital/next-ui/Button'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import OverlayPage from '../../components/AppShell/OverlayPage'
import apolloClient from '../../lib/apolloClient'

type Props = CountryRegionsQuery
type GetPageStaticProps = GetStaticProps<PageLayoutProps, Props>

function ShippingPage({ countries }: Props) {
  const classes = useFormStyles()
  const router = useRouter()
  const addressForm = useRef<() => Promise<boolean>>()
  const methodForm = useRef<() => Promise<boolean>>()

  const forceSubmit = () => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    ;(async () => {
      if (!addressForm.current || !methodForm.current) return
      await Promise.all([addressForm.current(), methodForm.current()])
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push('checkout/payment')
    })()
  }

  return (
    <OverlayPage
      variant='bottom'
      backFallbackHref='/cart'
      backFallbackTitle='Cart'
      title='Shipping'
      fullHeight
    >
      <PageMeta title='Checkout' metaDescription='Cart Items' metaRobots={['noindex']} />
      <Container maxWidth='md'>
        <CheckoutStepper steps={3} currentStep={2} />

        <IconTitle
          iconSrc='/icons/desktop_checkout_box.svg'
          title='Shipping'
          alt='box'
          size='normal'
        />

        <NoSsr>
          <EmailForm />
          <ShippingAddressForm countries={countries} doSubmit={addressForm} />
          <ShippingMethodForm doSubmit={methodForm} />
          <div className={classes.actions}>
            <Button
              type='submit'
              color='secondary'
              variant='pill'
              size='large'
              onClick={forceSubmit}
            >
              Next <ArrowForwardIos fontSize='inherit' />
            </Button>
          </div>
        </NoSsr>
      </Container>
    </OverlayPage>
  )
}

ShippingPage.Layout = PageLayout

registerRouteUi('/checkout', OverlayPage)

export default ShippingPage

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
