import { Container, Paper, DialogTitle, Typography, DialogContent } from '@material-ui/core'
import LayoutDrawer, { LayoutDrawerProps } from 'components/AppShell/LayoutDrawer'
import SignUpForm from 'components/Customer/SignUpForm'
import useSignedOutGuard from 'components/Customer/useSignedOutGuard'
import { PageFC, PageStaticPropsFn } from 'components/Page/types'
import PageMeta from 'components/PageMeta/PageMeta'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import React from 'react'

type PageComponent = PageFC<unknown, LayoutDrawerProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

const AccountSignUpPage: PageComponent = () => {
  const signedOut = useSignedOutGuard()

  if (!signedOut) return null

  return (
    <>
      <PageMeta
        title='Sign Up'
        metaDescription='Sign up for an account'
        metaRobots='NOINDEX, FOLLOW'
      />

      <Container maxWidth='sm'>
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

AccountSignUpPage.Layout = LayoutDrawer

export default AccountSignUpPage

export const getStaticProps: GetPageStaticProps = async () => {
  const client = apolloClient()
  const config = getStoreConfig(client)

  await config
  return {
    props: {
      title: 'Sign Up',
      apolloState: client.cache.extract(),
    },
  }
}
