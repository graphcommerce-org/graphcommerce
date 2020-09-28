import { NoSsr } from '@material-ui/core'
import getAppShellProps from 'components/AppLayout/getAppShellProps'
import AccountDashboard from 'components/Customer/AccountDashboard'
import useSignedInGuard from 'components/Customer/useSignedInGuard'
import PageMeta from 'components/PageMeta/PageMeta'
import overlay from 'components/PageTransition/overlay'
import ShopLayout, { ShopLayoutProps, PageWithShopLayout } from 'components/ShopLayout'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import { GetStaticProps } from 'next'
import React from 'react'

const AccountIndexPage: PageWithShopLayout = () => {
  const signedIn = useSignedInGuard()
  if (!signedIn) return null

  return (
    <>
      <PageMeta title='Account' metaDescription='Account Dashboard' metaRobots='NOINDEX, FOLLOW' />
      <NoSsr>
        <AccountDashboard />
      </NoSsr>
    </>
  )
}

AccountIndexPage.Layout = ShopLayout
AccountIndexPage.pageTransition = overlay

export default AccountIndexPage

export const getStaticProps: GetStaticProps<ShopLayoutProps> = async () => {
  const client = apolloClient()
  const staticClient = apolloClient()
  const config = getStoreConfig(client)
  const navigation = getAppShellProps(staticClient)

  await config
  return {
    props: {
      ...(await navigation),
      apolloState: client.cache.extract(),
    },
  }
}
