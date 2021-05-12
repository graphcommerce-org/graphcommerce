import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import { PageOptions, usePageRouter } from '@reachdigital/framer-next-pages'
import { OrderDetailPageDocument } from '@reachdigital/magento-customer/AccountDashboard/OrderDetailPage.gql'
import useOrderCardItemImages from '@reachdigital/magento-customer/OrderCardItemImage/useOrderCardItemImages'
import OrderDetails from '@reachdigital/magento-customer/OrderDetails'
import OrderItems from '@reachdigital/magento-customer/OrderItems'
import {
  PageMeta,
  StoreConfigDocument,
  CountryRegionsDocument,
  CountryRegionsQuery,
} from '@reachdigital/magento-store'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type Props = CountryRegionsQuery
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props>

function OrderDetailPage(props: Props) {
  const { countries } = props
  const router = usePageRouter()
  const { orderId } = router.query

  const { data, loading } = useQuery(OrderDetailPageDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { orderNumber: orderId as string },
    ssr: false,
  })
  const images = useOrderCardItemImages(data?.customer?.orders)
  const order = data?.customer?.orders?.items?.[0]
  const isLoading = orderId ? loading : true

  return (
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
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
  sharedKey: () => 'account-orders',
}
OrderDetailPage.pageOptions = pageOptions

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
      variant: 'bottom',
      size: 'max',
      backFallbackHref: '/account/orders',
      backFallbackTitle: 'Orders',
    },
  }
}
