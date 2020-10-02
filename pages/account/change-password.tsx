import { DialogTitle, DialogContent, Paper, Container, Typography, NoSsr } from '@material-ui/core'
import LayoutDrawer, { LayoutDrawerProps } from 'components/AppShell/LayoutDrawer'
import ChangePasswordForm from 'components/Customer/ChangePasswordForm'
import useSignedInGuard from 'components/Customer/useSignedInGuard'
import { PageFC, PageStaticPropsFn } from 'components/Page/types'
import PageMeta from 'components/PageMeta/PageMeta'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import React from 'react'

type PageComponent = PageFC<unknown, LayoutDrawerProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

const AccountChangePasswordPage: PageComponent = () => {
  const signedIn = useSignedInGuard()
  if (!signedIn) return null

  return (
    <>
      <PageMeta
        title='Change Password'
        metaDescription='Change your password'
        metaRobots='NOINDEX, FOLLOW'
      />

      <Container maxWidth='sm'>
        <Paper elevation={10}>
          <DialogTitle disableTypography>
            <Typography variant='h2' component='h1'>
              Change Password
            </Typography>
          </DialogTitle>
          <DialogContent>
            <NoSsr>
              <ChangePasswordForm />
            </NoSsr>
          </DialogContent>
        </Paper>
      </Container>
    </>
  )
}

AccountChangePasswordPage.Layout = LayoutDrawer

export default AccountChangePasswordPage

export const getStaticProps: GetPageStaticProps = async () => {
  const client = apolloClient()
  const config = getStoreConfig(client)

  await config
  return {
    props: {
      title: 'Change Password',
      apolloState: client.cache.extract(),
    },
  }
}
