import { PageOptions } from '@graphcommerce/framer-next-pages'
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
  SvgIcon,
  LayoutTitle,
  LinkOrButton,
} from '@graphcommerce/next-ui'
import { ComposedForm, ComposedSubmit } from '@graphcommerce/react-hook-form'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { LayoutMinimal, LayoutMinimalProps } from '../../components'
import { DefaultPageDocument } from '../../graphql/DefaultPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutMinimalProps, Props>

function ShippingPage() {
  const { data: cartData } = useCartQuery(ShippingPageDocument, {
    returnPartialData: true,
  })
  const cartExists = typeof cartData?.cart !== 'undefined'
  const router = useRouter()

  const onSubmitSuccessful = () => router.push('/checkout/payment')

  return (
    <ComposedForm>
      <PageMeta title={t`Checkout`} metaDescription={t`Cart Items`} metaRobots={['noindex']} />
      <LayoutHeader
        primary={
          <ComposedSubmit
            onSubmitSuccessful={onSubmitSuccessful}
            render={({ buttonState, submit, error }) => (
              <LinkOrButton
                button={{
                  type: 'submit',
                  variant: 'pill',
                  endIcon: <SvgIcon src={iconChevronRight} />,
                }}
                loading={
                  buttonState.isSubmitting || (buttonState.isSubmitSuccessful && !error)
                    ? true
                    : undefined
                }
                color='secondary'
                onClick={submit}
              >
                <Trans>Next</Trans>
              </LinkOrButton>
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

              <EmailForm step={1}>
                <Typography
                  variant='body2'
                  component='ul'
                  sx={(theme) => ({ pl: theme.spacings.xs, mt: theme.spacings.xxs })}
                >
                  <li>
                    <Trans>
                      E-mail address of existing customers will be recognized, sign in is optional.
                    </Trans>
                  </li>
                  <li>
                    <Trans>Fill in password fields to create an account.</Trans>
                  </li>
                  <li>
                    <Trans>Leave passwords fields empty to order as guest.</Trans>
                  </li>
                </Typography>
              </EmailForm>

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
                            ? true
                            : undefined
                        }
                        loadingPosition='end'
                        onClick={submit}
                        endIcon={<SvgIcon src={iconChevronRight} />}
                      >
                        <Trans>Next</Trans>
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
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const staticClient = graphqlSsrClient(locale)

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
