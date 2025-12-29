import { WaitForQueries } from '@graphcommerce/ecommerce-ui'
import { PageOptions } from '@graphcommerce/framer-next-pages'
import { cacheFirst } from '@graphcommerce/graphql'
import {
  CartItemSummary,
  CartSummary,
  getCheckoutIsDisabled,
  InlineAccount,
} from '@graphcommerce/magento-cart'
import { SignupNewsletter } from '@graphcommerce/magento-newsletter'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  FullPageMessage,
  iconParty,
  iconSadFace,
  IconSvg,
  LayoutHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Box, Button, CircularProgress, Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import type { LayoutMinimalProps, LayoutNavigationProps } from '../../components'
import { LayoutDocument, LayoutMinimal } from '../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../lib/graphql/graphqlSsrClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutNavigationProps, Props>

function OrderSuccessPage() {
  const router = useRouter()
  const { cart_id, order_number } = router.query ?? {}
  const hasCartId = !!cart_id

  return (
    <>
      <PageMeta title={t`Checkout summary`} metaRobots={['noindex']} />

      <WaitForQueries
        waitFor={router.isReady}
        fallback={<FullPageMessage icon={<CircularProgress />} title={<Trans>Loading</Trans>} />}
      >
        {!hasCartId && (
          <FullPageMessage
            title={<Trans>You have not placed an order</Trans>}
            icon={<IconSvg src={iconSadFace} size='xxl' />}
            button={
              <Button href='/' variant='pill' color='secondary' size='large'>
                <Trans>Continue shopping</Trans>
              </Button>
            }
          >
            <Trans>Discover our collection and add items to your cart!</Trans>
          </FullPageMessage>
        )}

        {hasCartId && (
          <LayoutHeader floatingMd disableBackNavigation>
            <LayoutTitle size='small' icon={iconParty}>
              <Trans>Thank you for your order!</Trans>
            </LayoutTitle>
          </LayoutHeader>
        )}

        {hasCartId && (
          <Container maxWidth='md'>
            <LayoutTitle icon={iconParty} sx={{ flexDirection: { md: 'column' } }}>
              <Box sx={{ display: 'grid', columns: 1, justifyItems: 'center' }}>
                <Trans>Thank you for your order!</Trans>
                {order_number && <Typography variant='subtitle1'>#{order_number}</Typography>}
              </Box>
            </LayoutTitle>
            <CartSummary />
            <CartItemSummary />
            <SignupNewsletter />
            <InlineAccount />
            <Box sx={{ textAlign: 'center', m: 8 }}>
              <Button href='/' color='primary' variant='pill' size='large' id='back-to-home'>
                <Trans>Back to home</Trans>
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
      up: { href: '/', title: t`Home` },
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
