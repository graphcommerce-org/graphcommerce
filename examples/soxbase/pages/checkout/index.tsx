import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { ArrowForwardIos } from '@material-ui/icons'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { ClientCartDocument } from '@reachdigital/magento-cart/ClientCart.gql'
import CheckoutStepper from '@reachdigital/magento-cart/cart/CheckoutStepper'
import EmptyCart from '@reachdigital/magento-cart/cart/EmptyCart'
import {
  CountryRegionsDocument,
  CountryRegionsQuery,
} from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import EmailForm from '@reachdigital/magento-cart/email/EmailForm'
import ShippingMethodForm from '@reachdigital/magento-cart/shipping-method/ShippingMethodForm'
import ShippingAddressForm from '@reachdigital/magento-cart/shipping/ShippingAddressForm'
import { StoreConfigDocument } from '@reachdigital/magento-store'
import Button from '@reachdigital/next-ui/Button'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import FormHeader from '@reachdigital/next-ui/FormHeader'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import PageMeta from '../../components/AppShell/PageMeta'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'

type Props = CountryRegionsQuery
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function ShippingPage({ countries }: Props) {
  const formClasses = useFormStyles()
  const router = useRouter()
  const addressForm = useRef<() => Promise<boolean>>()
  const methodForm = useRef<() => Promise<boolean>>()
  const { data: cartData } = useQuery(ClientCartDocument, { ssr: false })
  const cartExists = typeof cartData?.cart !== 'undefined'

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
    <Container maxWidth='md'>
      <PageMeta title='Checkout' metaDescription='Cart Items' metaRobots={['noindex']} />
      <NoSsr>
        {!cartExists && <EmptyCart />}

        {cartExists && (
          <>
            <CheckoutStepper steps={3} currentStep={2} />

            <IconTitle
              iconSrc='/icons/desktop_checkout_box.svg'
              title='Shipping'
              alt='box'
              size='normal'
            />

            <EmailForm />
            <ShippingAddressForm countries={countries} doSubmit={addressForm} />

            <FormHeader variant='h5'>Shipping method</FormHeader>

            <ShippingMethodForm doSubmit={methodForm} />

            <div className={formClasses.actions}>
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
          </>
        )}
      </NoSsr>
    </Container>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'checkout',
  SharedComponent: SheetShell,
  sharedKey: () => 'checkout',
  sharedProps: { variant: 'bottom', size: 'max' },
}
ShippingPage.pageOptions = pageOptions

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
