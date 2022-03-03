import { PageOptions } from '@graphcommerce/framer-next-pages'
import { CartItemSummary, CartSummary, InlineAccount } from '@graphcommerce/magento-cart'
import { SignupNewsletter } from '@graphcommerce/magento-newsletter'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  FullPageMessage,
  GetStaticProps,
  iconParty,
  iconSadFace,
  LayoutHeader,
  Stepper,
  IconSvg,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Button, Box, Container, NoSsr } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { LayoutFullProps, LayoutMinimal, LayoutMinimalProps } from '../../components'
import { DefaultPageDocument } from '../../graphql/DefaultPage.gql'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutFullProps, Props>

function OrderSuccessPage() {
  const hasCartId = !!useRouter().query.cartId

  return (
    <>
      <PageMeta
        title={t`Checkout summary`}
        metaDescription={t`Ordered items`}
        metaRobots={['noindex']}
      />
      <LayoutHeader
        divider={
          hasCartId ? (
            <Container maxWidth={false}>
              <Stepper steps={3} currentStep={3} />
            </Container>
          ) : undefined
        }
      >
        {hasCartId && (
          <LayoutTitle size='small' icon={iconParty}>
            <Trans>Thank you for your order!</Trans>
          </LayoutTitle>
        )}
      </LayoutHeader>
      <Container maxWidth='md'>
        <NoSsr>
          {!hasCartId && (
            <FullPageMessage
              title={t`You have not placed an order`}
              icon={<IconSvg src={iconSadFace} size='xxl' />}
              button={
                <Link href='/' passHref>
                  <Button variant='pill' color='secondary' size='large'>
                    <Trans>Continue shopping</Trans>
                  </Button>
                </Link>
              }
            >
              <Trans>Discover our collection and add items to your cart!</Trans>
            </FullPageMessage>
          )}
          {hasCartId && (
            <>
              <LayoutTitle icon={iconParty}>
                <Trans>Thank you for your order!</Trans>
              </LayoutTitle>
              <CartSummary />
              <CartItemSummary />

              <SignupNewsletter />

              <InlineAccount accountHref='/account' />

              <Box textAlign='center' m={8}>
                <Link href='/' passHref>
                  <Button color='secondary' variant='pill' size='large'>
                    <Trans>Back to home</Trans>
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
