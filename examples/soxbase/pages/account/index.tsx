import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import PageLayout from '@reachdigital/magento-app-shell/PageLayout'
import { AccountDashboardDocument } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboard.gql'
import AccountHeader from '@reachdigital/magento-customer/AccountHeader'
import AccountLatestOrder from '@reachdigital/magento-customer/AccountLatestOrder'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import AccountMenu from '../../components/AccountMenu'
import OverlayPage from '../../components/AppShell/OverlayPage'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<Record<string, unknown>>

function AccountIndexPage() {
  const { data, loading } = useQuery(AccountDashboardDocument, {
    fetchPolicy: 'cache-and-network',
    ssr: false,
  })

  return (
    <OverlayPage
      title='Account'
      variant='bottom'
      fullHeight
      backFallbackTitle='Home'
      backFallbackHref='/'
    >
      <Container maxWidth='md'>
        <NoSsr>
          <PageMeta title='Account' metaDescription='Account Dashboard' metaRobots={['noindex']} />
          <AccountHeader {...data?.customer} loading={loading} />
          <AccountMenu {...data?.customer} loading={loading} />
          <AccountLatestOrder {...data?.customer} loading={loading} />
        </NoSsr>
      </Container>
    </OverlayPage>
  )
}

AccountIndexPage.Layout = PageLayout

registerRouteUi('/account', OverlayPage)

export default AccountIndexPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(locale, true)
  const conf = client.query({ query: StoreConfigDocument })

  return {
    props: {
      apolloState: await conf.then(() => client.cache.extract()),
    },
  }
}
