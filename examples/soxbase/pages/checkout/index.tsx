import { Container, NoSsr } from '@material-ui/core'
import { PageOptions } from '@reachdigital/framer-next-pages'
import { ApolloCartErrorAlert, EmptyCart, useCartQuery } from '@reachdigital/magento-cart'
import { ShippingPageDocument } from '@reachdigital/magento-cart-checkout'
import { EmailForm } from '@reachdigital/magento-cart-email'
import { ShippingAddressForm } from '@reachdigital/magento-cart-shipping-address'
import { ShippingMethodForm } from '@reachdigital/magento-cart-shipping-method'
import { PageMeta, StoreConfigDocument } from '@reachdigital/magento-store'
import {
  AppShellTitle,
  Button,
  FormActions,
  FormHeader,
  GetStaticProps,
  iconBox,
  iconChevronRight,
  PageShellHeader,
  Stepper,
  SvgImage,
  Title,
} from '@reachdigital/next-ui'
import { ComposedForm, ComposedSubmit } from '@reachdigital/react-hook-form'
import PageLink from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import MinimalPageShell from '../../components/AppShell/MinimalPageShell'
import { SheetShellProps } from '../../components/AppShell/SheetShell'
import { DefaultPageDocument } from '../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function ShippingPage() {
  const { data: cartData } = useCartQuery(ShippingPageDocument, { returnPartialData: true })
  const cartExists = typeof cartData?.cart !== 'undefined'
  const router = useRouter()

  const onSubmitSuccessful = () => router.push('/checkout/payment')

  return (
    <ComposedForm>
      <PageMeta title='Checkout' metaDescription='Cart Items' metaRobots={['noindex']} />
      <PageShellHeader
        primary={
          <ComposedSubmit
            onSubmitSuccessful={onSubmitSuccessful}
            render={({ buttonState, submit, error }) => (
              <Button
                type='submit'
                color='secondary'
                variant='pill-link'
                loading={buttonState.isSubmitting || (buttonState.isSubmitSuccessful && !error)}
                onClick={submit}
              >
                Next
              </Button>
            )}
          />
        }
        divider={
          <Container maxWidth={false}>
            <Stepper steps={3} currentStep={2} />
          </Container>
        }
        backFallbackHref='/cart'
        backFallbackTitle='Cart'
      >
        <Title size='small' icon={iconBox}>
          Shipping
        </Title>
      </PageShellHeader>
      <Container maxWidth='md'>
        <NoSsr>
          {!cartExists && <EmptyCart />}

          {cartExists && (
            <>
              <AppShellTitle icon={iconBox}>Shipping</AppShellTitle>

              <EmailForm step={1} />

              <ShippingAddressForm step={2} />

              <FormHeader variant='h5'>Shipping method</FormHeader>

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
                        Next
                        <SvgImage
                          src={iconChevronRight}
                          alt='chevron right'
                          shade='inverted'
                          loading='eager'
                        />
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

const pageOptions: PageOptions<SheetShellProps> = {
  SharedComponent: MinimalPageShell,
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
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
