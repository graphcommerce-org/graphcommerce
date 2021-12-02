import { PageOptions, usePageRouter } from '@graphcommerce/framer-next-pages'
import { ApolloCartErrorAlert, EmptyCart, useCartQuery } from '@graphcommerce/magento-cart'
import { ShippingPageDocument } from '@graphcommerce/magento-cart-checkout'
import { EmailForm } from '@graphcommerce/magento-cart-email'
import { ShippingAddressForm } from '@graphcommerce/magento-cart-shipping-address'
import { ShippingMethodForm } from '@graphcommerce/magento-cart-shipping-method'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  Button,
  FormActions,
  FormHeader,
  GetStaticProps,
  iconBox,
  iconChevronRight,
  LayoutHeader,
  Stepper,
  SvgImageSimple,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { ComposedForm, ComposedSubmit } from '@graphcommerce/react-hook-form'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { DefaultPageDocument } from '../../components/GraphQL/DefaultPage.gql'
import { LayoutMinimal, LayoutMinimalProps } from '../../components/Layout'
import apolloClient from '../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutMinimalProps, Props>

function ShippingPage() {
  const { data: cartData } = useCartQuery(ShippingPageDocument, {
    returnPartialData: true,
  })
  const cartExists = typeof cartData?.cart !== 'undefined'
  const router = usePageRouter()

  const onSubmitSuccessful = () => router.push('/checkout/payment')

  return (
    <ComposedForm>
      <PageMeta title={t`Checkout`} metaDescription={t`Cart Items`} metaRobots={['noindex']} />
      <LayoutHeader
        primary={
          <ComposedSubmit
            onSubmitSuccessful={onSubmitSuccessful}
            render={({ buttonState, submit, error }) => (
              <Button
                type='submit'
                color='secondary'
                variant='pill-link'
                size='small'
                loading={buttonState.isSubmitting || (buttonState.isSubmitSuccessful && !error)}
                onClick={submit}
                endIcon={<SvgImageSimple src={iconChevronRight} inverted size='small' />}
              >
                <Trans>Next</Trans>
              </Button>
            )}
          />
        }
        divider={
          <Container maxWidth='md'>
            <Stepper currentStep={2} steps={3} />
          </Container>
        }
      >
        <LayoutTitle size='small' icon={iconBox}>
          <Trans>Shipping</Trans>
        </LayoutTitle>
      </LayoutHeader>
      <Container maxWidth='md'>
        <NoSsr>
          {!cartExists && <EmptyCart />}

          {cartExists && (
            <>
              <LayoutTitle icon={iconBox}>
                <Trans>Shipping</Trans>
              </LayoutTitle>

              <EmailForm step={1} />

              <ShippingAddressForm step={2} />

              <FormHeader variant='h5'>
                <Trans>Shipping method</Trans>
              </FormHeader>

              <ShippingMethodForm step={3} />

              <ComposedSubmit
                onSubmitSuccessful={onSubmitSuccessful}
                render={({ buttonState, submit, error }) => (
                  <>
                    <FormActions>
                      <Button
                        type='submit'
                        color='secondary'
                        variant='pill'
                        size='large'
                        loading={
                          buttonState.isSubmitting || (buttonState.isSubmitSuccessful && !error)
                        }
                        onClick={submit}
                      >
                        <Trans>Next</Trans>
                        <SvgImageSimple src={iconChevronRight} inverted />
                      </Button>
                    </FormActions>
                    <ApolloCartErrorAlert
                      key='error'
                      error={buttonState.isSubmitting ? undefined : error}
                    />
                  </>
                )}
              />
            </>
          )}
        </NoSsr>
      </Container>
    </ComposedForm>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
  sharedKey: () => 'checkout',
}
ShippingPage.pageOptions = pageOptions

export default ShippingPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })
  const staticClient = apolloClient(locale)

  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `checkout`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      ...(await page).data,
      up: { href: '/cart', title: 'Cart' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
