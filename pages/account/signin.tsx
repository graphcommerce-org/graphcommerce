import { DialogTitle, DialogContent, Paper, Container, Typography } from '@material-ui/core'
import LayoutDrawer, { LayoutDrawerProps } from 'components/AppShell/LayoutDrawer'
import SignInForm from 'components/Customer/SignInForm'
import useSignedOutGuard from 'components/Customer/useSignedOutGuard'
import { PageFC, PageStaticPropsFn } from 'components/Page/types'
import PageMeta from 'components/PageMeta/PageMeta'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import React from 'react'

type PageComponent = PageFC<unknown, LayoutDrawerProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

const AccountSignInPage: PageComponent = () => {
  const signedOut = useSignedOutGuard()

  if (!signedOut) return null

  return (
    <>
      <PageMeta title='Sign in' metaDescription='Cart Items' metaRobots='NOINDEX, FOLLOW' />

      <Container maxWidth='xs'>
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

AccountSignInPage.Layout = LayoutDrawer

export default AccountSignInPage

export const getStaticProps: GetPageStaticProps = async () => {
  const client = apolloClient()
  const config = getStoreConfig(client)

  await config
  return {
    props: {
      title: 'Sign In',
      apolloState: client.cache.extract(),
    },
  }
}
