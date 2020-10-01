import { Container, Paper, DialogTitle, Typography, DialogContent } from '@material-ui/core'
import LayoutHeader, { LayoutHeaderProps } from 'components/AppShell/LayoutHeader'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import useHeaderSpacing from 'components/AppShell/useHeaderSpacing'
import SignUpForm from 'components/Customer/SignUpForm'
import useSignedOutGuard from 'components/Customer/useSignedOutGuard'
import { PageFC, PageStaticPropsFn } from 'components/Page/types'
import PageMeta from 'components/PageMeta/PageMeta'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import React from 'react'

type PageComponent = PageFC<unknown, LayoutHeaderProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

const AccountSignUpPage: PageComponent = () => {
  const signedOut = useSignedOutGuard()
  const { marginTop } = useHeaderSpacing()

  if (!signedOut) return null

  return (
    <>
      <PageMeta
        title='Sign Up'
        metaDescription='Sign up for an account'
        metaRobots='NOINDEX, FOLLOW'
      />

      <Container maxWidth='sm' className={marginTop}>
        <Paper elevation={10}>
          <DialogTitle disableTypography>
            <Typography variant='h2' component='h1'>
              Sign Up
            </Typography>
          </DialogTitle>
          <DialogContent>
            <SignUpForm />
          </DialogContent>
        </Paper>
      </Container>
    </>
  )
}

AccountSignUpPage.Layout = LayoutHeader

export default AccountSignUpPage

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
