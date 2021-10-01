import { useQuery } from '@apollo/client'
import { PageOptions, usePageRouter } from '@graphcommerce/framer-next-pages'
import { ApolloCustomerErrorFullPage } from '@graphcommerce/magento-customer'
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
  SheetShellHeader,
  Title,
  AppShellTitle,
} from '@graphcommerce/next-ui'
import { Container, NoSsr } from '@mui/material'
import React from 'react'
import SheetShell, { SheetShellProps } from '../../../components/AppShell/SheetShell'
import apolloClient from '../../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<SheetShellProps, Props>

function OrderDetailPage(props: Props) {
  const router = usePageRouter()
  const { orderId } = router.query

  const { data, loading, error } = useQuery(OrderDetailPageDocument, {
    fetchPolicy: 'cache-and-network',
    variables: { orderNumber: orderId as string },
    ssr: false,
  })
  const images = useOrderCardItemImages(data?.customer?.orders)
  const order = data?.customer?.orders?.items?.[0]
  const isLoading = orderId ? loading : true

  if (loading) return <div />
  if (error)
    return (
      <ApolloCustomerErrorFullPage
        error={error}
        signInHref='/account/signin'
        signUpHref='/account/signin'
      />
    )

  return (
    <>
      <SheetShellHeader backFallbackTitle='Account' backFallbackHref='/account'>
        <Title size='small' component='span' icon={iconBox}>
          Order #{orderId}
        </Title>
      </SheetShellHeader>
      <Container maxWidth='md'>
        <NoSsr>
          {(!orderId || !order) && (
            <IconHeader src={iconBox} title='Order not found' alt='no order' size='large' />
          )}

          <AppShellTitle icon={iconBox}>Order #{orderId}</AppShellTitle>

          {orderId && order && (
            <>
              <PageMeta
                title={`Order view #${orderId}`}
                metaDescription={`Order detail page for order #${orderId}`}
                metaRobots={['noindex']}
              />
              <OrderItems {...order} loading={isLoading} images={images} />
              <OrderDetails {...order} loading={isLoading} />
            </>
          )}
        </NoSsr>
      </Container>
    </>
  )
}

const pageOptions: PageOptions<SheetShellProps> = {
  overlayGroup: 'account',
  SharedComponent: SheetShell,
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
