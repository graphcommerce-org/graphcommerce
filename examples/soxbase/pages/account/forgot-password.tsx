import { Container, NoSsr } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import getLayoutHeaderProps from '@reachdigital/magento-app-shell/getLayoutHeaderProps'
import ForgotPasswordForm from '@reachdigital/magento-customer/ForgotPasswordForm'
import useSignedOutGuard from '@reachdigital/magento-customer/useSignedOutGuard'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import getStoreConfig from '@reachdigital/magento-store/getStoreConfig'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
import { PageFC, PageStaticPropsFn } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import apolloClient from '../../lib/apolloClient'

type PageComponent = PageFC<unknown, PageLayoutProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

const AccountForgotPasswordPage: PageComponent = () => {
  const signedIn = useSignedOutGuard()
  if (!signedIn) return null

  return (
    <BottomDrawerUi title='Forgot Password'>
      <PageMeta
        title='Forgot Password'
        metaDescription='Forgot password'
        metaRobots='NOINDEX, FOLLOW'
      />
      <Container maxWidth='xs'>
        <NoSsr>
          <ForgotPasswordForm />
        </NoSsr>
      </Container>
    </BottomDrawerUi>
  )
}

AccountForgotPasswordPage.Layout = PageLayout

registerRouteUi('/account/forgot-password', BottomDrawerUi)

export default AccountForgotPasswordPage

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
