import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useGtagPurchase } from '@graphcommerce/googleanalytics'
import {
  CartItemSummary,
  CartSummary,
  InlineAccount,
  useCartQuery,
} from '@graphcommerce/magento-cart'
import { CartItemSummaryDocument } from '@graphcommerce/magento-cart/components/CartItemSummary/GetCartItemSummary.gql'
import { SignupNewsletter } from '@graphcommerce/magento-newsletter'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  FullPageMessage,
  GetStaticProps,
  iconParty,
  iconSadFace,
  LayoutHeader,
  IconSvg,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Button, Box, Container } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LayoutMinimal, LayoutNavigationProps, LayoutMinimalProps } from '../../components'
import { LayoutDocument } from '../../components/Layout/Layout.gql'
import { DefaultPageDocument } from '../../graphql/DefaultPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props>

function OrderSuccessPage() {
  const hasCartId = !!useRouter().query.cart_id

  useGtagPurchase()

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Checkout summary')} metaRobots={['noindex']} />
      <LayoutHeader floatingMd>
        {hasCartId && (
          <LayoutTitle size='small' icon={iconParty}>
            <Trans id='Thank you for your order!' />
          </LayoutTitle>
        )}
      </LayoutHeader>
      <Container maxWidth='md'>
        {!hasCartId && (
          <FullPageMessage
            title={<Trans id='You have not placed an order' />}
            icon={<IconSvg src={iconSadFace} size='xxl' />}
            button={
              <Link href='/' passHref>
                <Button variant='pill' color='secondary' size='large'>
                  <Trans id='Continue shopping' />
                </Button>
              </Link>
            }
          >
            <Trans id='Discover our collection and add items to your cart!' />
          </FullPageMessage>
        )}
        {hasCartId && (
          <>
            <LayoutTitle icon={iconParty}>
              <Trans id='Thank you for your order!' />
            </LayoutTitle>
            <CartSummary />
            <CartItemSummary />

            <SignupNewsletter />

            <InlineAccount accountHref='/account' />

            <Box textAlign='center' m={8}>
              <Link href='/' passHref>
                <Button color='primary' variant='pill' size='large' id='back-to-home'>
                  <Trans id='Back to home' />
                </Button>
              </Link>
            </Box>
          </>
        )}
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
  sharedKey: () => 'checkout',
}
OrderSuccessPage.pageOptions = pageOptions

export default OrderSuccessPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)
  const conf = client.query({ query: StoreConfigDocument })
  const page = staticClient.query({
    query: DefaultPageDocument,
    variables: { url: `checkout/success` },
  })
  const layout = staticClient.query({ query: LayoutDocument })

  return {
    props: {
      ...(await page).data,
      ...(await layout).data,
      up: { href: '/', title: 'Home' },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
