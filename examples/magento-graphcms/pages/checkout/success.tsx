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
import { Button, Box, Container, Typography, CircularProgress } from '@mui/material'
import { useRouter } from 'next/router'
import {
  LayoutDocument,
  LayoutMinimal,
  LayoutNavigationProps,
  LayoutMinimalProps,
} from '../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../lib/graphql/graphqlSsrClient'
import { WaitForQueries } from '@graphcommerce/ecommerce-ui'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props>

function OrderSuccessPage() {
  const router = useRouter()
  const { cart_id, order_number } = router.query ?? {}
  const hasCartId = !!cart_id

  return (
    <>
      <PageMeta title={i18n._(/* i18n */ 'Checkout summary')} metaRobots={['noindex']} />

      <WaitForQueries
        waitFor={router.isReady}
        fallback={<FullPageMessage icon={<CircularProgress />} title={<Trans id='Loading' />} />}
      >
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
          <LayoutHeader floatingMd disableBackNavigation>
            <LayoutTitle size='small' icon={iconParty}>
              <Trans id='Thank you for your order!' />
            </LayoutTitle>
          </LayoutHeader>
        )}

        {hasCartId && (
          <Container maxWidth='md'>
            <LayoutTitle icon={iconParty} sx={{ flexDirection: { md: 'column' } }}>
              <Box sx={{ display: 'grid', columns: 1, justifyItems: 'center' }}>
                <Trans id='Thank you for your order!' />
                {order_number && <Typography variant='subtitle1'>#{order_number}</Typography>}
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
          </Container>
        )}
      </WaitForQueries>
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
