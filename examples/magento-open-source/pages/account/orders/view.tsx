import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  getCustomerAccountIsDisabled,
  OrderAdditional,
  OrderDetailPageDocument,
  OrderDetails,
  OrderItems,
  OrderStateLabel,
  OrderTotals,
  ReorderItems,
  useCustomerQuery,
  WaitForCustomer,
} from '@graphcommerce/magento-customer'
import { CountryRegionsDocument, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import {
  FullPageMessage,
  iconBox,
  IconSvg,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { t } from '@lingui/core/macro'
import { Trans } from '@lingui/react/macro'
import { Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutOverlay } from '../../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function OrderDetailPage() {
  const router = useRouter()
  const orderNumber = String(router.query.orderNumber)

  const orders = useCustomerQuery(OrderDetailPageDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { orderNumber },
    skip: !orderNumber,
  })
  const order = orders.data?.customer?.orders?.items?.[0]

  return (
    <>
      <LayoutOverlayHeader primary={order && <ReorderItems order={order} />}>
        <LayoutTitle size='small' component='span' icon={iconBox}>
          <Trans>Order #{orderNumber}</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <WaitForCustomer waitFor={[orders, router.isReady]} sx={{ height: '100%' }}>
        <Container maxWidth='md'>
          {(!orderNumber || !order) && (
            <FullPageMessage
              title={<Trans>Order not found</Trans>}
              icon={<IconSvg src={iconBox} size='xxl' />}
            />
          )}

          {orderNumber && order && (
            <>
              <LayoutTitle
                icon={iconBox}
                gutterBottom={false}
                sx={(theme) => ({ mb: theme.spacings.xxs })}
              >
                <Trans>Order #{orderNumber}</Trans>
              </LayoutTitle>

              <PageMeta title={t`Order #${orderNumber}`} metaRobots={['noindex']} />
              <Typography sx={(theme) => ({ textAlign: 'center', mb: theme.spacings.lg })}>
                <OrderStateLabel {...order} />
              </Typography>
              <OrderDetails order={order} />
              <OrderItems order={order} />
              <OrderTotals order={order} />
              <OrderAdditional order={order} />
            </>
          )}
        </Container>
      </WaitForCustomer>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  sharedKey: () => 'account/orders',
  Layout: LayoutOverlay,
}
OrderDetailPage.pageOptions = pageOptions

export default OrderDetailPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  if (getCustomerAccountIsDisabled(context.locale)) return { notFound: true }

  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const config = client.query({ query: StoreConfigDocument })

  const countryRegions = staticClient.query({
    query: CountryRegionsDocument,
  })

  return {
    props: {
      ...(await countryRegions).data,
      apolloState: await config.then(() => client.cache.extract()),
      variantMd: 'bottom',
      up: { href: '/account/orders', title: t`Orders` },
    },
  }
}
