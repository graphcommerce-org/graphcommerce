import { useQuery } from '@apollo/client'
import { Container, NoSsr } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
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

type GetPageStaticProps = GetStaticProps<PageLayoutProps>

function AccountIndexPage() {
  const { data } = useQuery(AccountDashboardDocument)
  const customer = data?.customer

  return (
    <OverlayUi title='Account' variant='bottom' fullHeight>
      <PageMeta title='Account' metaDescription='Account Dashboard' metaRobots='NOINDEX, FOLLOW' />

      <Container maxWidth='md'>
        <NoSsr>
          {customer && (
            <>
              <AccountHeader {...customer} />
              <AccountMenu {...customer} />
              <AccountLatestOrder {...customer} />
            </>
          )}
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
