import { Container, NoSsr, Typography } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { useCartQuery, EmptyCart } from '@reachdigital/magento-cart'
import { ShippingPageDocument } from '@reachdigital/magento-cart-checkout'
import { EmailForm } from '@reachdigital/magento-cart-email'
import { ShippingAddressForm } from '@reachdigital/magento-cart-shipping-address'
import { ShippingMethodForm } from '@reachdigital/magento-cart-shipping-method'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import Button from '@reachdigital/next-ui/Button'
import ApolloErrorAlert from '@reachdigital/next-ui/Form/ApolloErrorAlert'
import FormActions from '@reachdigital/next-ui/Form/FormActions'
import FormHeader from '@reachdigital/next-ui/FormHeader'
import IconHeader from '@reachdigital/next-ui/IconHeader'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import Stepper from '@reachdigital/next-ui/Stepper/Stepper'
import SvgImage from '@reachdigital/next-ui/SvgImage'
import { iconBox, iconChevronRight } from '@reachdigital/next-ui/icons'
import { ComposedForm, ComposedSubmit } from '@reachdigital/react-hook-form'
import { useRouter } from 'next/router'
import React from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import SheetShell, { SheetShellProps } from '../../components/AppShell/SheetShell'
import apolloClient from '../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function ShippingPage() {
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
            <Typography variant='h5' component='h1' align='center'>
              Checkout
            </Typography>

            <Stepper steps={3} currentStep={2} />

            <IconHeader src={iconBox} title='Shipping' alt='box' size='large' />

            <EmailForm step={1} />

            <ShippingAddressForm step={2} />

            <FormHeader variant='h5'>Shipping method</FormHeader>

            <ShippingMethodForm step={3} />

            <ComposedSubmit
              onSubmitSuccessful={() => router.push('/checkout/payment')}
              render={({ buttonState, submit, error }) => (
                <>
                  <FormActions>
                    <Button
                      type='submit'
                      color='secondary'
                      variant='pill'
                      size='large'
                      loading={buttonState.isSubmitting || buttonState.isSubmitSuccessful}
                      onClick={submit}
                    >
                      Next{' '}
                      <SvgImage
                        src={iconChevronRight}
                        alt='chevron right'
                        shade='inverted'
                        loading='eager'
                      />
                    </Button>
                  </FormActions>
                  <ApolloErrorAlert
                    key='error'
                    error={buttonState.isSubmitting ? undefined : error}
                  />
                </>
              )}
            />
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
      backFallbackHref: '/cart',
      backFallbackTitle: 'Cart',
    },
  }
}
