import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import { AccountDashboardDocument } from '@reachdigital/magento-customer/AccountDashboard/AccountDashboard.gql'
import AccountMenu from '@reachdigital/magento-customer/AccountMenu'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import OverlayUi from '@reachdigital/next-ui/AppShell/OverlayUi'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<PageLayoutProps>

function AccountIndexPage() {
  const dashboard = useQuery(AccountDashboardDocument)

  const customer = dashboard.data?.customer

  return (
    <OverlayUi title='Account' variant='bottom' fullHeight>
      <PageMeta title='Account' metaDescription='Account Dashboard' metaRobots='NOINDEX, FOLLOW' />

      <Container maxWidth='sm'>
        {customer && (
          <>
            <AccountHeader {...customer} />
            <AccountMenu {...customer} />
            <AccountLatestOrder {...customer.orders} />
          </>
        )}
      </Container>
    </OverlayUi>
  )
}

AccountIndexPage.Layout = PageLayout

registerRouteUi('/account', OverlayUi)

export default AccountIndexPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))

  const config = client.query({ query: StoreConfigDocument })
  const pageLayout = staticClient.query({ query: PageLayoutDocument })

  await config
  return {
    props: {
      ...(await pageLayout).data,
      apolloState: client.cache.extract(),
    },
  }
}
