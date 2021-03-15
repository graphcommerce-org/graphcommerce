import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import {
  CountryRegionsDocument,
  CountryRegionsQuery,
} from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import { OrderDetailPageDocument } from '@reachdigital/magento-customer/AccountDashboard/OrderDetailPage.gql'
import useOrderCardItemImages from '@reachdigital/magento-customer/OrderCardItemImage/useOrderCardItemImages'
import OrderDetails from '@reachdigital/magento-customer/OrderDetails'
import OrderItems from '@reachdigital/magento-customer/OrderItems'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { useRouter } from 'next/router'
import React from 'react'
import OverlayPage from '../../../components/AppShell/OverlayPage'
import apolloClient from '../../../lib/apolloClient'

type Props = CountryRegionsQuery
type GetPageStaticProps = GetStaticProps<Props>

function OrderDetailPage(props: Props) {
  const { countries } = props
  const router = useRouter()
  const { orderId } = router.query

  const { data, loading } = useQuery(OrderDetailPageDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { orderNumber: orderId as string },
  })
  const images = useOrderCardItemImages(data?.customer?.orders)
  const order = data?.customer?.orders?.items?.[0]
  const isLoading = orderId ? loading : true

  return (
    <OverlayPage
      title='Orders'
      variant='bottom'
      fullHeight
      backFallbackHref='/account/orders'
      backFallbackTitle='Orders'
    >
      <Container maxWidth='md'>
        <NoSsr>
          {(!orderId || !order) && (
            <IconTitle
              iconSrc='/icons/desktop_checkout_box.svg'
              title='Order not found'
              alt='no order'
              size='large'
            />
          )}

          {orderId && order && (
            <>
              <PageMeta
                title={`Order view #${orderId}`}
                metaDescription={`Order detail page for order #${orderId}`}
                metaRobots={['noindex']}
              />
              <OrderItems {...order} loading={isLoading} images={images} />
              <OrderDetails {...order} loading={isLoading} countries={countries} />
            </>
          )}
        </NoSsr>
      </Container>
    </OverlayPage>
  )
}

OrderDetailPage.Layout = PageLayout

registerRouteUi('/account/order/view', OverlayPage)

export default OrderDetailPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)
  const config = client.query({ query: StoreConfigDocument })

  const countryRegions = staticClient.query({
    query: CountryRegionsDocument,
  })

  return {
    props: {
      ...(await countryRegions).data,
      apolloState: await config.then(() => client.cache.extract()),
    },
  }
}
