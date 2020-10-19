import { NoSsr } from '@material-ui/core'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import AccountDashboard from 'components/Customer/AccountDashboard'
import useSignedInGuard from 'components/Customer/useSignedInGuard'
import PageLayout, { PageLayoutProps } from 'components/AppShell/PageLayout'
import { PageFC, PageStaticPropsFn } from 'components/Page/types'
import PageMeta from 'components/PageMeta/PageMeta'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import React from 'react'

type PageComponent = PageFC<unknown, PageLayoutProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

const AccountIndexPage: PageComponent = () => {
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

AccountIndexPage.Layout = PageLayout

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
