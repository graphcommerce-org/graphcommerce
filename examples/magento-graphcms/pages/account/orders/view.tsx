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
  SheetAppBar,
  Title,
  AppShellTitle,
} from '@graphcommerce/next-ui'
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@material-ui/core'
import React from 'react'
import { LayoutSheet, LayoutSheetProps } from '../../../components/Layout/LayoutSheet'
import apolloClient from '../../../lib/apolloClient'

type Props = Record<string, unknown>
type GetPageStaticProps = GetStaticProps<LayoutSheetProps, Props>

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
      <SheetAppBar>
        <Title size='small' component='span' icon={iconBox}>
          <Trans>Order #{orderId}</Trans>
        </Title>
      </SheetAppBar>
      <Container maxWidth='md'>
        <NoSsr>
          {(!orderId || !order) && (
            <IconHeader src={iconBox} title={t`Order not found`} size='large' />
          )}

          <AppShellTitle icon={iconBox}>
            <Trans>Order #{orderId}</Trans>
          </AppShellTitle>

          {orderId && order && (
            <>
              <PageMeta
                title={t`Order view #${orderId}`}
                metaDescription={t`Order detail page for order #${orderId}`}
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

const pageOptions: PageOptions<LayoutSheetProps> = {
  overlayGroup: 'account',
  Layout: LayoutSheet,
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
      up: { href: '/account/orders', title: 'Orders' },
    },
  }
}
