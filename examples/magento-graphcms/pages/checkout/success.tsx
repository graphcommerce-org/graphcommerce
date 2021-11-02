import { PageOptions } from '@graphcommerce/framer-next-pages'
import { CartItemSummary, CartSummary, InlineAccount } from '@graphcommerce/magento-cart'
import { SignupNewsletter } from '@graphcommerce/magento-newsletter'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  AppShellTitle,
  Button,
  FullPageMessage,
  GetStaticProps,
  iconParty,
  iconSadFace,
  PageShellHeader,
  Stepper,
  SvgImageSimple,
  Title,
} from '@graphcommerce/next-ui'
import { Box, Container, NoSsr } from '@material-ui/core'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { FullPageShellProps } from '../../components/AppShell/FullPageShell'
import MinimalPageShell, { MinimalPageShellProps } from '../../components/AppShell/MinimalPageShell'
import { DefaultPageDocument } from '../../components/GraphQL/DefaultPage.gql'
import apolloClient from '../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<FullPageShellProps, Props>

function OrderSuccessPage() {
  const hasCartId = !!useRouter().query.cartId

  return (
    <>
      <PageMeta title='Checkout summary' metaDescription='Ordered items' metaRobots={['noindex']} />
      <PageShellHeader
        divider={
          hasCartId ? (
            <Container maxWidth={false}>
              <Stepper steps={3} currentStep={3} />
            </Container>
          ) : undefined
        }
      >
        {hasCartId && (
          <Title size='small' icon={iconParty}>
            <>Thank you for your order!</>
          </Title>
        )}
      </PageShellHeader>
      <Container maxWidth='md'>
        <NoSsr>
          {!hasCartId && (
            <FullPageMessage
              title={'You have not placed an order'}
              icon={<SvgImageSimple src={iconSadFace} size='xxl' />}
              button={
                <Link href='/' passHref>
                  <Button variant='contained' color='primary' size='large'>
                    Continue shopping
                  </Button>
                </Link>
              }
            >
              Discover our collection and add items to your basket!
            </FullPageMessage>
          )}
          {hasCartId && (
            <>
              <AppShellTitle icon={iconParty}>Thank you for your order!</AppShellTitle>
              <CartSummary />
              <CartItemSummary />

              <SignupNewsletter />

              <InlineAccount accountHref='/account' />

              <Box textAlign='center' m={8}>
                <Link href='/' passHref>
                  <Button color='secondary' variant='pill' size='large'>
                    Back to home
                  </Button>
                </Link>
              </Box>
            </>
          )}
        </NoSsr>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<MinimalPageShellProps> = {
  overlayGroup: 'checkout',
  SharedComponent: MinimalPageShell,
  sharedKey: () => 'checkout',
}
OrderSuccessPage.pageOptions = pageOptions

export default OrderSuccessPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: {
      url: `checkout/success`,
      rootCategory: (await conf).data.storeConfig?.root_category_uid ?? '',
    },
  })

  return {
    props: {
      ...(await page).data,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
