import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { ArrowForwardIos } from '@material-ui/icons'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { ShippingPageDocument } from '@reachdigital/magento-cart-checkout/ShippingPage.gql'
import EmailForm from '@reachdigital/magento-cart-email/EmailForm/EmailForm'
import ShippingAddressForm from '@reachdigital/magento-cart-shipping-address/ShippingAddressForm/ShippingAddressForm'
import ShippingMethodForm from '@reachdigital/magento-cart-shipping-method/ShippingMethodForm/ShippingMethodForm'
import { useCartQuery } from '@reachdigital/magento-cart/CurrentCartId/useCartQuery'
import EmptyCart from '@reachdigital/magento-cart/EmptyCart/EmptyCart'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import {
  CountryRegionsDocument,
  CountryRegionsQuery,
} from '@reachdigital/magento-store/CountryRegions.gql'
import Button from '@reachdigital/next-ui/Button'
import useFormStyles from '@reachdigital/next-ui/Form/useFormStyles'
import FormHeader from '@reachdigital/next-ui/FormHeader'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import CheckoutStepper from '@reachdigital/next-ui/Stepper/Stepper'
import {
  ComposedForm,
  ComposedController,
  ComposedSubmitRenderComponentProps,
} from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import React from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'

type Props = CountryRegionsQuery
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function ShippingPage() {
  const formClasses = useFormStyles()
  const { data: cartData } = useCartQuery(ShippingPageDocument, { returnPartialData: true })
  const cartExists = typeof cartData?.cart !== 'undefined'
  const router = useRouter()

  return (
    <Container maxWidth='md'>
      <PageMeta title='Checkout' metaDescription='Cart Items' metaRobots={['noindex']} />
      <NoSsr>
        {!cartExists && <EmptyCart />}

        {cartExists && (
          <ComposedForm>
            <CheckoutStepper steps={3} currentStep={2} />

            <IconTitle
              iconSrc='/icons/desktop_checkout_box.svg'
              title='Shipping'
              alt='box'
              size='normal'
            />

            <EmailForm step={1} />
            <ShippingAddressForm step={2} />

            <FormHeader variant='h5'>Shipping method</FormHeader>

            <ShippingMethodForm step={3} />

            <div className={formClasses.actions}>
              <ComposedController
                RenderComponent={({ formState, submit }: ComposedSubmitRenderComponentProps) => (
                  <Button
                    type='submit'
                    color='secondary'
                    variant='pill'
                    size='large'
                    loading={formState.isSubmitting || formState.isSubmitSuccessful}
                    onClick={() => {
                      // eslint-disable-next-line @typescript-eslint/no-floating-promises
                      submit().then((success) => success && router.push('/checkout/payment'))
                    }}
                  >
                    Next <ArrowForwardIos fontSize='inherit' />
                  </Button>
                )}
              />
            </div>
          </ComposedForm>
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

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
