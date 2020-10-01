import { DialogTitle, DialogContent, Paper, Container, Typography } from '@material-ui/core'
import LayoutHeader, { LayoutHeaderProps } from 'components/AppShell/LayoutHeader'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import useHeaderSpacing from 'components/AppShell/useHeaderSpacing'
import SignInForm from 'components/Customer/SignInForm'
import useSignedOutGuard from 'components/Customer/useSignedOutGuard'
import { PageFC, PageStaticPropsFn } from 'components/Page/types'
import PageMeta from 'components/PageMeta/PageMeta'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import React from 'react'

type PageComponent = PageFC<unknown, LayoutHeaderProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

const AccountSignInPage: PageComponent = () => {
  const { marginTop } = useHeaderSpacing()
  const signedOut = useSignedOutGuard()

  if (!signedOut) return null

  return (
    <>
      <PageMeta title='Sign in' metaDescription='Cart Items' metaRobots='NOINDEX, FOLLOW' />

      <Container maxWidth='xs' className={marginTop}>
        <Paper elevation={10}>
          <DialogTitle disableTypography>
            <Typography variant='h2' component='h1'>
              Login
            </Typography>
          </DialogTitle>
          <DialogContent>
            <SignInForm />
          </DialogContent>
        </Paper>
      </Container>
    </>
  )
}

AccountSignInPage.Layout = LayoutHeader

export default AccountSignInPage

export const getStaticProps: GetPageStaticProps = async () => {
  const client = apolloClient()
  const staticClient = apolloClient()
  const config = getStoreConfig(client)
  const layoutHeader = getLayoutHeaderProps(staticClient)

  await config
  return {
    props: {
      ...(await layoutHeader),
      apolloState: client.cache.extract(),
    },
  }
}
