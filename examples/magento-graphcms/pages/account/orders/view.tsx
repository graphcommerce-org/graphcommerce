import { PageOptions } from '@graphcommerce/framer-next-pages'
import { ApolloCustomerErrorFullPage, useCustomerQuery } from '@graphcommerce/magento-customer'
import {
  useOrderCardItemImages,
  OrderDetails,
  OrderItems,
  OrderDetailPageDocument,
} from '@graphcommerce/magento-customer-order'
import { CountryRegionsDocument, PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  IconHeader,
  GetStaticProps,
  iconBox,
  LayoutOverlayHeader,
  LayoutTitle,
  FullPageMessage,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { CircularProgress, Container } from '@mui/material'
import { useRouter } from 'next/router'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSsrClient, graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function OrderDetailPage() {
  const router = useRouter()
  const { orderId } = router.query

  const { data, loading, error, called } = useCustomerQuery(OrderDetailPageDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { orderNumber: orderId as string },
  })

  const images = useOrderCardItemImages(data?.customer?.orders)
  const order = data?.customer?.orders?.items?.[0]
  const isLoading = orderId ? loading : true

  if (loading || !called)
    return (
      <FullPageMessage icon={<CircularProgress />} title='Loading your account'>
        <Trans id='This may take a second' />
      </FullPageMessage>
    )
  if (error) return <ApolloCustomerErrorFullPage error={error} />

  return (
    <>
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconBox}>
          <Trans id='Order #{orderId}' values={{ orderId }} />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        {(!orderId || !order) && (
          <IconHeader src={iconBox} size='large'>
            <Trans id='Order not found' />
          </IconHeader>
        )}

        <LayoutTitle icon={iconBox}>
          <Trans id='Order #{orderId}' values={{ orderId }} />
        </LayoutTitle>

        {orderId && order && (
          <>
            <PageMeta
              title={i18n._(/* i18n */ 'Order #{orderId}', { orderId })}
              metaRobots={['noindex']}
            />
            <OrderItems {...order} loading={isLoading} images={images} />
            <OrderDetails {...order} loading={isLoading} />
          </>
        )}
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

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const staticClient = graphqlSsrClient(locale)
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
      up: { href: '/account/orders', title: 'Orders' },
    },
  }
}
