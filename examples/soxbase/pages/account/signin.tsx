import { Button, Container, Link } from '@material-ui/core'
import PageLayout, { PageLayoutProps } from '@reachdigital/magento-app-shell/PageLayout'
import getLayoutHeaderProps from '@reachdigital/magento-app-shell/getLayoutHeaderProps'
import SignInForm from '@reachdigital/magento-customer/SignInForm'
import useSignedOutGuard from '@reachdigital/magento-customer/useSignedOutGuard'
import PageMeta from '@reachdigital/magento-store/PageMeta'
import getStoreConfig from '@reachdigital/magento-store/getStoreConfig'
import BottomDrawerUi from '@reachdigital/next-ui/AppShell/BottomDrawerUi'
import { PageFC, PageStaticPropsFn } from '@reachdigital/next-ui/Page/types'
import PageLink from '@reachdigital/next-ui/PageTransition/PageLink'
import { registerRouteUi } from '@reachdigital/next-ui/PageTransition/historyHelpers'
import React from 'react'
import apolloClient from '../../lib/apolloClient'

type PageComponent = PageFC<unknown, PageLayoutProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

const AccountSignInPage: PageComponent = () => {
  const signedOut = useSignedOutGuard()

  if (!signedOut) return null

  return (
    <BottomDrawerUi
      title='Sign In'
      headerForward={
        <PageLink href='/account/signup'>
          <Button color='primary'>Create account</Button>
        </PageLink>
      }
    >
      <PageMeta title='Sign in' metaDescription='Cart Items' metaRobots='NOINDEX, FOLLOW' />
      <Container maxWidth='xs'>
        <SignInForm>
          <PageLink href='/account/forgot-password'>
            <Link>Forgot password?</Link>
          </PageLink>
        </SignInForm>
      </Container>
    </BottomDrawerUi>
  )
}

AccountSignInPage.Layout = PageLayout

registerRouteUi('/account/signin', BottomDrawerUi)

export default AccountSignInPage

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
