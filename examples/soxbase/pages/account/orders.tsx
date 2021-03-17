import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import { AccountDashboardOrdersDocument } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboardOrders.gql'
import AccountOrders from '@reachdigital/magento-customer/AccountOrders'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import IconTitle from '@reachdigital/next-ui/IconTitle'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import OverlayPage from '../../components/AppShell/OverlayPage'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<Record<string, unknown>>

function AccountOrdersPage() {
  const { data } = useQuery(AccountDashboardOrdersDocument, {
    fetchPolicy: 'cache-and-network',
  })
  const customer = data?.customer

  return (
    <OverlayPage
      title='Orders'
      variant='bottom'
      fullHeight
      backFallbackHref='/account'
      backFallbackTitle='Account'
    >
      <Container maxWidth='md'>
        <NoSsr>
          <PageMeta
            title='Orders'
            metaDescription='View all your orders'
            metaRobots={['noindex']}
          />

          <IconTitle
            iconSrc='/icons/desktop_checkout_box.svg'
            title='Orders'
            alt='orders'
            size='large'
          />
          <AccountOrders {...customer} />
        </NoSsr>
      </Container>
    </OverlayPage>
  )
}

AccountOrdersPage.Layout = PageLayout

registerRouteUi('/account/orders', OverlayPage)

export default AccountOrdersPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const staticClient = apolloClient(locale)

  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
