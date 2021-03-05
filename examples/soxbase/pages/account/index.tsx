import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { AccountDashboardDocument } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboard.gql'
import AccountHeader from '@reachdigital/magento-customer/AccountHeader'
import AccountLatestOrder from '@reachdigital/magento-customer/AccountLatestOrder'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import AccountMenu from '../../components/AccountMenu'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<Record<string, unknown>>

function AccountIndexPage() {
  const { data, loading } = useQuery(AccountDashboardDocument)
  const customer = data?.customer

  return (
    <OverlayUi title='Account' variant='bottom' fullHeight>
      <PageMeta title='Account' metaDescription='Account Dashboard' metaRobots='NOINDEX, FOLLOW' />

      <Container maxWidth='md'>
        <NoSsr>
          <AccountHeader {...customer} loading={loading} />
          <AccountMenu {...customer} loading={loading} />
          <AccountLatestOrder {...customer} loading={loading} />
        </NoSsr>
      </Container>
    </OverlayUi>
  )
}

AccountIndexPage.Layout = PageLayout

registerRouteUi('/account', OverlayUi)

export default AccountIndexPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(localeToStore(locale))
  const config = client.query({ query: StoreConfigDocument })

  await config
  return {
    props: {
      apolloState: client.cache.extract(),
    },
  }
}
