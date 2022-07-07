import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import { ApolloCustomerErrorFullPage, useCustomerQuery } from '@graphcommerce/magento-customer'
import {
  AccountDashboardOrdersDocument,
  AccountOrders,
} from '@graphcommerce/magento-customer-account'
import { PageMeta, StoreConfigDocument } from '@graphcommerce/magento-store'
import {
  FullPageMessage,
  GetStaticProps,
  iconBox,
  LayoutOverlayHeader,
  IconSvg,
  LayoutTitle,
} from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { Trans } from '@lingui/react'
import { CircularProgress, Container } from '@mui/material'
import { useRouter } from 'next/router'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountOrdersPage() {
  const { query } = useRouter()

  const { data, loading, error, called } = useCustomerQuery(AccountDashboardOrdersDocument, {
    fetchPolicy: 'cache-and-network',
    variables: {
      pageSize: 5,
      currentPage: Number(query?.page ?? 1),
    },
  })
  const customer = data?.customer

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
          <Trans id='Orders' />
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta title={i18n._(/* i18n */ 'Orders')} metaRobots={['noindex']} />
        {customer?.orders && customer.orders.items.length > 0 && (
          <>
            <LayoutTitle icon={iconBox}>Orders</LayoutTitle>
            <AccountOrders {...customer} />
          </>
        )}

        {customer?.orders && customer.orders.items.length < 1 && (
          <FullPageMessage
            title={<Trans id='You have no orders yet' />}
            icon={<IconSvg src={iconBox} size='xxl' />}
          >
            <Trans id='Discover our collection and place your first order!' />
          </FullPageMessage>
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
AccountOrdersPage.pageOptions = pageOptions

export default AccountOrdersPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = graphqlSharedClient(locale)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
      variantMd: 'bottom',
      size: 'max',
      up: { href: '/account', title: 'Account' },
    },
  }
}
