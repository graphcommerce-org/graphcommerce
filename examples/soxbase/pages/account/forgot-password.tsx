import { Container, NoSsr } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import ForgotPasswordForm from '@reachdigital/magento-customer/ForgotPasswordForm'
import useSignedOutGuard from '@reachdigital/magento-customer/useSignedOutGuard'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<PageLayoutProps>

function AccountForgotPasswordPage() {
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
