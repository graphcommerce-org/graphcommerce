import { Container, Paper, DialogTitle, Typography, DialogContent } from '@material-ui/core'
import BottomDrawerUi, { BottomDrawerUiProps } from 'components/AppShell/BottomDrawerUi'
import PageLayout, { PageLayoutProps } from 'components/AppShell/PageLayout'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import SignUpForm from 'components/Customer/SignUpForm'
import useSignedOutGuard from 'components/Customer/useSignedOutGuard'
import { PageFC, PageStaticPropsFn } from 'components/Page/types'
import PageMeta from 'components/PageMeta/PageMeta'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import React from 'react'

type PageComponent = PageFC<unknown, PageLayoutProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

const AccountSignUpPage: PageComponent = () => {
  const signedOut = useSignedOutGuard()

  if (!signedOut) return null

  return (
    <BottomDrawerUi title='Sign Up'>
      <PageMeta
        title='Sign Up'
        metaDescription='Sign up for an account'
        metaRobots='NOINDEX, FOLLOW'
      />
      <Container maxWidth='sm'>
        <SignUpForm />
      </Container>
    </BottomDrawerUi>
  )
}

AccountSignUpPage.Layout = PageLayout

export default AccountSignUpPage

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
