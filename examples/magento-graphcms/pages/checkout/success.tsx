import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import {
  CartItemSummary,
  CartSummary,
  InlineAccount,
  getCheckoutIsDisabled,
} from '@graphcommerce/magento-cart'
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
import { Button, Box, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import {
  LayoutDocument,
  LayoutMinimal,
  LayoutNavigationProps,
  LayoutMinimalProps,
} from '../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props>

function OrderSuccessPage() {
  const hasCartId = !!useRouter().query.cart_id

  const orderNumber = useRouter().query.order_number

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Checkout summary')} metaRobots={['noindex']} />
      <LayoutHeader floatingMd disableBackNavigation>
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
              <Button href='/' variant='pill' color='secondary' size='large'>
                <Trans id='Continue shopping' />
              </Button>
            }
          >
            <Trans id='Discover our collection and add items to your cart!' />
          </FullPageMessage>
        )}
        {hasCartId && (
          <>
            <LayoutTitle icon={iconParty} sx={{ flexDirection: { md: 'column' } }}>
              <Box sx={{ display: 'grid', columns: 1, justifyItems: 'center' }}>
                <Trans id='Thank you for your order!' />
                {orderNumber && <Typography variant='subtitle1'>#{orderNumber}</Typography>}
              </Box>
            </LayoutTitle>
            <CartSummary />
            <CartItemSummary />

            <SignupNewsletter />

            <InlineAccount />

            <Box textAlign='center' m={8}>
              <Button href='/' color='primary' variant='pill' size='large' id='back-to-home'>
                <Trans id='Back to home' />
              </Button>
            </Box>
          </>
        )}
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutMinimalProps> = {
  Layout: LayoutMinimal,
}
OrderSuccessPage.pageOptions = pageOptions

export default OrderSuccessPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCheckoutIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const conf = client.query({ query: StoreConfigDocument })
  const layout = staticClient.query({
    query: LayoutDocument,
    fetchPolicy: cacheFirst(staticClient),
  })

  return {
    props: {
      ...(await layout).data,
      up: { href: '/', title: i18n._(/* i18n */ 'Home') },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
