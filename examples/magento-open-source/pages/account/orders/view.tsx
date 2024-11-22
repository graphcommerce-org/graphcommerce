import type { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  CancelOrderForm,
  OrderDetailPageDocument,
  OrderDetails,
  OrderItems,
  OrderStateLabel,
  OrderTotals,
  ReorderItems,
  WaitForCustomer,
  getCustomerAccountIsDisabled,
  useCustomerQuery,
  useOrderCardItemImages,
} from '@graphcommerce/magento-customer'
import { CountryRegionsDocument, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import type { GetStaticProps } from '@graphcommerce/next-ui'
import { IconHeader, LayoutOverlayHeader, LayoutTitle, iconBox } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/macro'
import { Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import type { LayoutOverlayProps } from '../../../components'
import { LayoutOverlay } from '../../../components'
import { graphqlSharedClient, graphqlSsrClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function OrderDetailPage() {
  const router = useRouter()
  const { orderNumber } = router.query

  const orders = useCustomerQuery(OrderDetailPageDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { orderNumber: orderNumber as string },
    skip: !orderNumber,
  })
  const { data } = orders
  const images = useOrderCardItemImages(data?.customer?.orders)
  const order = data?.customer?.orders?.items?.[0]

  return (
    <WaitForCustomer waitFor={orders}>
      <LayoutOverlayHeader primary={order && <ReorderItems order={order} />}>
        <LayoutTitle size='small' component='span' icon={iconBox}>
          <Trans>Order #{orderNumber}</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        {(!orderNumber || !order) && (
          <IconHeader src={iconBox} size='large'>
            <Trans>Order not found</Trans>
          </IconHeader>
        )}

        <LayoutTitle
          icon={iconBox}
          gutterBottom={false}
          sx={(theme) => ({ mb: theme.spacings.xxs })}
        >
          <Trans>Order #{orderNumber}</Trans>
        </LayoutTitle>

        {orderNumber && order && (
          <>
            <PageMeta
              title={i18n._(/* i18n */ 'Order #{orderNumber}', { orderNumber })}
              metaRobots={['noindex']}
            />
            <Typography sx={(theme) => ({ textAlign: 'center', mb: theme.spacings.lg })}>
              <OrderStateLabel {...order} />
            </Typography>
            <OrderDetails {...order} />
            <OrderItems {...order} images={images} />
            <OrderTotals {...order} />

            <CancelOrderForm order={order} />
          </>
        )}
      </Container>
    </WaitForCustomer>
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
      up: { href: '/account/orders', title: i18n._(/* i18n */ 'Orders') },
    },
  }
}
