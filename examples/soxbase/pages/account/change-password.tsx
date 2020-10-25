import { Container, NoSsr } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import getLayoutHeaderProps from '@reachdigital/magento-app-shell/getLayoutHeaderProps'
import ChangePasswordForm from '@reachdigital/magento-customer/ChangePasswordForm'
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

const AccountChangePasswordPage: PageComponent = () => {
  const signedIn = useSignedInGuard()
  if (!signedIn) return null

  return (
    <BottomDrawerUi title='Change Password'>
      <PageMeta
        title='Change Password'
        metaDescription='Change your password'
        metaRobots='NOINDEX, FOLLOW'
      />
      <Container maxWidth='sm'>
        <NoSsr>
          <ChangePasswordForm />
        </NoSsr>
      </Container>
    </BottomDrawerUi>
  )
}

AccountChangePasswordPage.Layout = PageLayout

registerRouteUi('/account/change-password', BottomDrawerUi)

export default AccountChangePasswordPage

export const getStaticProps: GetPageStaticProps = async () => {
  const client = apolloClient()
  const config = getStoreConfig(client)

  const staticClient = apolloClient()
  const layoutHeader = getLayoutHeaderProps(staticClient)

  await config
  return {
    props: {
      ...(await layoutHeader),
      apolloState: client.cache.extract(),
    },
  }
}
