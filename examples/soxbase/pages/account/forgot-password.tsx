import { Container, NoSsr } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import { PageLayoutDocument } from '@reachdigital/magento-app-shell/PageLayout.gql'
import ForgotPasswordForm from '@reachdigital/magento-customer/ForgotPasswordForm'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.gql'
import localeToStore from '@reachdigital/magento-store/localeToStore'
import { GetStaticProps } from '@reachdigital/next-ui/Page/types'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import OverlayPage from '../../components/AppShell/OverlayUi'
import apolloClient from '../../lib/apolloClient'

type GetPageStaticProps = GetStaticProps<PageLayoutProps>

function AccountForgotPasswordPage() {
  return (
    <OverlayPage
      title='Forgot Password'
      variant='center'
      backFallbackHref='/account/signin'
      backFallbackTitle='Sign In'
    >
      <PageMeta
        title='Forgot Password'
        metaDescription='Forgot password'
        metaRobots={['noindex']}
      />
      <Container maxWidth='xs'>
        <NoSsr>
          <ForgotPasswordForm />
        </NoSsr>
      </Container>
    </OverlayPage>
  )
}

AccountForgotPasswordPage.Layout = PageLayout

registerRouteUi('/account/forgot-password', OverlayPage)

export default AccountForgotPasswordPage

export const getStaticProps: GetPageStaticProps = async ({ locale }) => {
  const client = apolloClient(localeToStore(locale))
  const staticClient = apolloClient(localeToStore(locale))

  const config = client.query({ query: StoreConfigDocument })
  const pageLayout = staticClient.query({ query: PageLayoutDocument })

  return {
    props: {
      ...(await pageLayout).data,
      apolloState: await config.then(() => client.cache.extract()),
    },
  }
}
