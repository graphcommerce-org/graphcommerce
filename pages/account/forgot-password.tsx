import { Container, NoSsr } from '@material-ui/core'
import BottomDrawerUi from 'components/AppShell/BottomDrawerUi'
import PageLayout, { PageLayoutProps } from 'components/AppShell/PageLayout'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import ForgotPasswordForm from 'components/Customer/ForgotPasswordForm'
import useSignedOutGuard from 'components/Customer/useSignedOutGuard'
import { PageFC, PageStaticPropsFn } from 'components/Page/types'
import PageMeta from 'components/PageMeta/PageMeta'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import React from 'react'

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
