import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import {
  CountryRegionsDocument,
  CountryRegionsQuery,
} from '@reachdigital/magento-cart/countries/CountryRegions.gql'
import useOrderCardItemImages from '@reachdigital/magento-customer/OrderCardItemImage/useOrderCardItemImages'
import { OrderDetailPageDocument } from '@reachdigital/magento-customer/OrderDetailPage/OrderDetailPage.gql'
import OrderDetails from '@reachdigital/magento-customer/OrderDetails'
import OrderedItems from '@reachdigital/magento-customer/OrderedItems'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import { useRouter } from 'next/router'
import React from 'react'
import apolloClient from '../../../lib/apolloClient'

type Props = CountryRegionsQuery
type GetPageStaticProps = GetStaticProps<Props>

function OrderDetailPage(props: Props) {
  const { countries } = props
  const router = useRouter()
  const { orderId } = router.query

  const { data, loading } = useQuery(OrderDetailPageDocument, {
    variables: { orderNumber: orderId as string },
  })
  const images = useOrderCardItemImages(data?.customer?.orders)
  const order = data?.customer?.orders?.items?.[0]

  return (
    <OverlayUi title='Orders' variant='bottom' fullHeight>
      <PageMeta
        title={`Order Details #${orderId}`}
        metaDescription={`Order detail page for order #${orderId}`}
        metaRobots='NOINDEX, FOLLOW'
      />
      <Container maxWidth='md'>
        <NoSsr>
          <OrderedItems {...order} loading={loading} images={images} />
          <OrderDetails {...order} loading={loading} countries={countries} />
        </NoSsr>
      </Container>
    </OverlayUi>
  )
}

OrderDetailPage.Layout = PageLayout

registerRouteUi('/account/order/view', OverlayUi)

export default OrderDetailPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))
  const config = client.query({ query: StoreConfigDocument })

  const countryRegions = staticClient.query({
    query: CountryRegionsDocument,
  })

  await config
  return {
    props: {
      ...(await countryRegions).data,
      apolloState: client.cache.extract(),
    },
  }
}
