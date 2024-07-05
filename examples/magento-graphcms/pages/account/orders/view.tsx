import { PageOptions } from '@graphcommerce/framer-next-pages'
import {
  useCustomerQuery,
  WaitForCustomer,
  useOrderCardItemImages,
  OrderDetails,
  OrderTotals,
  OrderItems,
  OrderDetailPageDocument,
  OrderStateLabel,
} from '@graphcommerce/magento-customer'
import { CountryRegionsDocument, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  IconHeader,
  GetStaticProps,
  iconBox,
  LayoutOverlayHeader,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function OrderDetailPage() {
  const router = useRouter()
  const { orderId } = router.query

  const orders = useCustomerQuery(OrderDetailPageDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { orderNumber: orderId as string },
  })
  const { data } = orders
  const images = useOrderCardItemImages(data?.customer?.orders)
  const order = data?.customer?.orders?.items?.[0]

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconBox}>
          <Trans id='Order #{orderId}' values={{ orderId }} />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <WaitForCustomer waitFor={orders}>
          {(!orderId || !order) && (
            <IconHeader src={iconBox} size='large'>
              <Trans id='Order not found' />
            </IconHeader>
          )}

          <LayoutTitle
            icon={iconBox}
            gutterBottom={false}
            sx={(theme) => ({ mb: theme.spacings.xxs })}
          >
            <Trans id='Order #{orderId}' values={{ orderId }} />
          </LayoutTitle>

          {orderId && order && (
            <>
              <PageMeta
                title={i18n._(/* i18n */ 'Order #{orderId}', { orderId })}
                metaRobots={['noindex']}
              />
              <Typography sx={(theme) => ({ textAlign: 'center', mb: theme.spacings.lg })}>
                <OrderStateLabel items={order.items} />
              </Typography>
              <OrderDetails {...order} />
              <OrderItems {...order} images={images} />
              <OrderTotals {...order} />
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
OrderDetailPage.pageOptions = pageOptions

export default OrderDetailPage

export const getStaticProps: GetPageStaticProps = async (context) => {
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
      size: 'max',
      up: { href: '/account/orders', title: i18n._(/* i18n */ 'Orders') },
    },
  }
}
