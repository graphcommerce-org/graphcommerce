import { NoSsr } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import getLayoutHeaderProps from '@reachdigital/magento-app-shell/getLayoutHeaderProps'
import AccountDashboard from '@reachdigital/magento-customer/AccountDashboard'
import SignOutForm from '@reachdigital/magento-customer/SignOutForm'
import useSignedInGuard from '@reachdigital/magento-customer/useSignedInGuard'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import getStoreConfig from '@reachdigital/magento-store/getStoreConfig'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
import { PageFC, PageStaticPropsFn } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import apolloClient from '../../lib/apolloClient'

type PageComponent = PageFC<unknown, PageLayoutProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

const AccountIndexPage: PageComponent = () => {
  const signedIn = useSignedInGuard()
  if (!signedIn) return null

  return (
    <BottomDrawerUi title='Account' headerForward={<SignOutForm />}>
      <PageMeta title='Account' metaDescription='Account Dashboard' metaRobots='NOINDEX, FOLLOW' />
      <NoSsr>
        <AccountDashboard />
      </NoSsr>
    </BottomDrawerUi>
  )
}

AccountIndexPage.Layout = PageLayout

registerRouteUi('/account', BottomDrawerUi)

export default AccountIndexPage

export const getStaticProps: GetPageStaticProps = async () => {
  const client = apolloClient()
  const staticClient = apolloClient()
  const config = getStoreConfig(client)
  const layoutHeader = getLayoutHeaderProps(staticClient)

  await config
  return {
    props: {
      title: 'Account',
      ...(await layoutHeader),
      apolloState: client.cache.extract(),
    },
  }
}
