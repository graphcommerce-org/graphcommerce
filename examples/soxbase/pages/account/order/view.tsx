import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import useOrderCardItemImages from '@reachdigital/magento-customer/OrderCardItemImage/useOrderCardItemImages'
import { OrderDetailPageDocument } from '@reachdigital/magento-customer/OrderDetailPage/OrderDetailPage.gql'
import OrderedItem from '@reachdigital/magento-customer/OrderedItem'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import SectionContainer from '@reachdigital/next-ui/SectionContainer'
import { useRouter } from 'next/router'
import React from 'react'

const OrderDetailPage = () => {
  const router = useRouter()
  const { orderId } = router.query

  const { data, loading } = useQuery(OrderDetailPageDocument, {
    variables: {
      orderNumber: orderId as string,
    },
  })

  const orders = data?.customer?.orders
  const order = orders?.items?.[0]

  const orderedItemsImages = useOrderCardItemImages(orders)

  return (
    <OverlayUi title='Orders' variant='bottom' fullHeight>
      <PageMeta
        title={`Order Details #${orderId}`}
        metaDescription={`Order detail page for order #${orderId}`}
        metaRobots='NOINDEX, FOLLOW'
      />
      <Container maxWidth='md'>
        <NoSsr>
          {loading && 'Loading'}

          <SectionContainer label='Ordered items' /* endLabel='SHIPPED'*/>
            {order?.items?.map((orderedItem) => (
              <div key={`orderedItem-${orderedItem?.product_sku}`}>
                {orderedItem && (
                  <OrderedItem
                    {...orderedItem}
                    {...orderedItemsImages[orderedItem?.product_url_key ?? '']}
                  />
                )}
              </div>
            ))}
          </SectionContainer>
        </NoSsr>
      </Container>
    </OverlayUi>
  )
}

OrderDetailPage.Layout = PageLayout

registerRouteUi('/account/order', OverlayUi)

export default OrderDetailPage
