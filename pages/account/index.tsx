import { useQuery } from '@apollo/client'
import { NoSsr } from '@material-ui/core'
import BottomDrawerUi from 'components/AppShell/BottomDrawerUi'
import PageLayout, { PageLayoutProps } from 'components/AppShell/PageLayout'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import AccountDashboard from 'components/Customer/AccountDashboard'
import SignOutForm from 'components/Customer/SignOutForm'
import useSignedInGuard from 'components/Customer/useSignedInGuard'
import { PageFC, PageStaticPropsFn } from 'components/Page/types'
import PageMeta from 'components/PageMeta/PageMeta'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import { CustomerDocument } from 'generated/documents'
import apolloClient from 'lib/apolloClient'
import React from 'react'

type PageComponent = PageFC<unknown, PageLayoutProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

const AccountIndexPage: PageComponent = () => {
  const signedIn = useSignedInGuard()
  const { data } = useQuery(CustomerDocument)
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
