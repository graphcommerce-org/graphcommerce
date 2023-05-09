import { PageOptions } from '@graphcommerce/framer-next-pages'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import {
  useCustomerQuery,
  WaitForCustomer,
  useOrderCardItemImages,
  OrderDetails,
  OrderItems,
  OrderDetailPageDocument,
} from '@graphcommerce/magento-customer'
import { CountryRegionsDocument, PageMeta } from '@graphcommerce/magento-store'
import { IconHeader, iconBox, LayoutOverlayHeader, LayoutTitle } from '@graphcommerce/next-ui'
import { enhanceStaticProps } from '@graphcommerce/next-ui/server'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { Container } from '@mui/material'
import { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { getLayout } from '../../../components/Layout/layout'

function OrderDetailPage(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const { orderId } = router.query

  const orders = useCustomerQuery(OrderDetailPageDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { orderNumber: orderId as string },
  })
  const { data, loading } = orders
  const images = useOrderCardItemImages(data?.customer?.orders)
  const order = data?.customer?.orders?.items?.[0]
  const isLoading = orderId ? loading : true

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
        </WaitForCustomer>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<LayoutOverlayProps> = {
  overlayGroup: 'account',
  sharedKey: () => 'account/orders',
  Layout: LayoutOverlay,
  layoutProps: { variantMd: 'bottom' },
}
OrderDetailPage.pageOptions = pageOptions

export default OrderDetailPage

export const getStaticProps = enhanceStaticProps(getLayout, async () => {
  return {
    props: {
      ...(await graphqlQuery(CountryRegionsDocument)).data,
      up: { href: '/account/orders', title: 'Orders' },
    },
  }
})
