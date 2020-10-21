import { Button, Container, Link } from '@material-ui/core'
import BottomDrawerUi from 'components/AppShell/BottomDrawerUi'
import PageLayout, { PageLayoutProps } from 'components/AppShell/PageLayout'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import SignInForm from 'components/Customer/SignInForm'
import useSignedOutGuard from 'components/Customer/useSignedOutGuard'
import { PageFC, PageStaticPropsFn } from 'components/Page/types'
import PageMeta from 'components/PageMeta/PageMeta'
import PageLink from 'components/PageTransition/PageLink'
import { registerRoute } from 'components/PageTransition/historyHelpers'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import React from 'react'

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

registerRoute('/account/signin', BottomDrawerUi)

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
