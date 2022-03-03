import { PageOptions } from '@graphcommerce/framer-next-pages'
import { useQuery } from '@graphcommerce/graphql'
import { ApolloCustomerErrorFullPage } from '@graphcommerce/magento-customer'
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
import { t, Trans } from '@lingui/macro'
import { Container, NoSsr } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import { LayoutOverlay, LayoutOverlayProps } from '../../../components'
import { graphqlSharedClient } from '../../../lib/graphql/graphqlSsrClient'

type GetPageStaticProps = GetStaticProps<LayoutOverlayProps>

function AccountOrdersPage() {
  const { query } = useRouter()

  const { data, loading, error } = useQuery(AccountDashboardOrdersDocument, {
    fetchPolicy: 'cache-and-network',
    ssr: false,
    variables: {
      pageSize: 5,
      currentPage: Number(query?.page ?? 1),
    },
  })
  const customer = data?.customer

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
      <LayoutOverlayHeader>
        <LayoutTitle size='small' component='span' icon={iconBox}>
          <Trans>Orders</Trans>
        </LayoutTitle>
      </LayoutOverlayHeader>
      <Container maxWidth='md'>
        <PageMeta
          title={t`Orders`}
          metaDescription='View all your orders'
          metaRobots={['noindex']}
        />
        <NoSsr>
          {customer?.orders && customer.orders.items.length > 0 && (
            <>
              <LayoutTitle icon={iconBox}>Orders</LayoutTitle>
              <AccountOrders {...customer} />
            </>
          )}

          {customer?.orders && customer.orders.items.length < 1 && (
            <FullPageMessage
              title={t`You have no orders yet`}
              icon={<IconSvg src={iconBox} size='xxl' />}
            >
              <Trans>Discover our collection and place your first order!</Trans>
            </FullPageMessage>
          )}
        </NoSsr>
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
