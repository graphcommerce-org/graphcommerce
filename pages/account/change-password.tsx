import { DialogTitle, DialogContent, Paper, Container, Typography, NoSsr } from '@material-ui/core'
import LayoutHeader, { LayoutHeaderProps } from 'components/AppShell/LayoutHeader'
import getLayoutHeaderProps from 'components/AppShell/getLayoutHeaderProps'
import useHeaderSpacing from 'components/AppShell/useHeaderSpacing'
import ChangePasswordForm from 'components/Customer/ChangePasswordForm'
import useSignedInGuard from 'components/Customer/useSignedInGuard'
import { PageFC, PageStaticPropsFn } from 'components/Page/types'
import PageMeta from 'components/PageMeta/PageMeta'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import React from 'react'

type PageComponent = PageFC<unknown, LayoutHeaderProps>
type GetPageStaticProps = PageStaticPropsFn<PageComponent>

const AccountChangePasswordPage: PageComponent = () => {
  const { marginTop } = useHeaderSpacing()
  const signedIn = useSignedInGuard()
  if (!signedIn) return null

  return (
    <>
      <PageMeta
        title='Change Password'
        metaDescription='Change your password'
        metaRobots='NOINDEX, FOLLOW'
      />

      <Container maxWidth='sm' className={marginTop}>
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

AccountChangePasswordPage.Layout = LayoutHeader

export default AccountChangePasswordPage

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
