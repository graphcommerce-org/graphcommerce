import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  useCustomerQuery,
  WaitForCustomer,
  OrderDetailPageDocument,
  CancelOrderForm,
  canCancelOrder,
} from '@graphcommerce/magento-customer'
import {
  CountryRegionsDocument,
  PageMeta,
  StoreConfigDocument,
  StoreConfigQuery,
} from '@graphcommerce/magento-store'
import { GetStaticProps, LayoutOverlayHeader, LayoutTitle, iconBin } from '@graphcommerce/next-ui'
import { Trans, t } from '@lingui/macro'
import { Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

type Props = StoreConfigQuery

function CancelOrderPage(props: Props) {
  const { storeConfig } = props
  const router = useRouter()
  const { orderId } = router.query

  const orders = useCustomerQuery(OrderDetailPageDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { orderNumber: orderId as string },
    skip: !orderId,
  })
  const { data } = orders
  const order = data?.customer?.orders?.items?.[0]

  const cancelOrder = order && canCancelOrder(order)

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconBin}>
          <Trans>Cancel order #{orderId}</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={t`Cancel order #${orderId}`} metaRobots={['noindex']} />
        <WaitForCustomer waitFor={orders}>
          {(!orderId || !order) && (
            <LayoutTitle
              icon={iconBin}
              gutterBottom={false}
              sx={(theme) => ({ mb: theme.spacings.xxs })}
            >
              <Trans>Order #{orderId} not found</Trans>
            </LayoutTitle>
          )}

          {order && !cancelOrder && (
            <LayoutTitle
              icon={iconBin}
              gutterBottom={false}
              sx={(theme) => ({ mb: theme.spacings.xxs })}
            >
              <Trans>Order #{orderId} can not be canceled</Trans>
            </LayoutTitle>
          )}

          {orderId && order && cancelOrder && (
            <>
              <LayoutTitle
                icon={iconBin}
                gutterBottom={false}
                sx={(theme) => ({ mb: theme.spacings.xxs })}
              >
                <Trans>Cancel order #{orderId}</Trans>
              </LayoutTitle>
              <Typography variant='h6' textAlign='center'>
                <Trans>
                  Are you sure you want to cancel your order? This action is not reversable.
                </Trans>
              </Typography>
              <CancelOrderForm
                orderId={order.id}
                options={storeConfig?.order_cancellation_reasons ?? []}
              />
            </>
          )}
        </WaitForCustomer>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  sharedKey: () => 'account/orders',
  Layout: LayoutOverlay,
}
CancelOrderPage.pageOptions = pageOptions

export default CancelOrderPage

export const getStaticProps: GetPageStaticProps = async (context) => {
  const client = graphqlSharedClient(context)
  const staticClient = graphqlSsrClient(context)
  const config = client.query({ query: StoreConfigDocument })

  const countryRegions = staticClient.query({
    query: CountryRegionsDocument,
  })

  if (!(await config).data.storeConfig?.order_cancellation_enabled) return { notFound: true }

  return {
    props: {
      ...(await countryRegions).data,
      ...(await config).data,
      apolloState: await config.then(() => client.cache.extract()),
      variantMd: 'bottom',
      up: { href: '/account/orders', title: t`Orders` },
    },
  }
}
