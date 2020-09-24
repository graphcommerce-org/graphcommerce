import {
  DialogTitle,
  DialogContent,
  Paper,
  Container,
  Typography,
  NoSsr,
  DialogActions,
} from '@material-ui/core'
import ChangePasswordForm from 'components/Customer/ChangePasswordForm'
import useSignedInGuard from 'components/Customer/useSignedInGuard'
import getHeaderProps from 'components/AppLayout/getHeaderProps'
import useHeaderSpacing from 'components/AppLayout/useHeaderSpacing'
import PageMeta from 'components/PageMeta/PageMeta'
import overlay from 'components/PageTransition/overlay'
import ShopLayout, { ShopLayoutProps, PageWithShopLayout } from 'components/ShopLayout'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import { GetStaticProps } from 'next'
import React from 'react'

const AccountChangePasswordPage: PageWithShopLayout = () => {
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

AccountChangePasswordPage.Layout = ShopLayout
AccountChangePasswordPage.pageTransition = overlay

export default AccountChangePasswordPage

export const getStaticProps: GetStaticProps<ShopLayoutProps> = async () => {
  const client = apolloClient()
  const staticClient = apolloClient()
  const config = getStoreConfig(client)
  const navigation = getHeaderProps(staticClient, {
    rootCategory: String((await config).storeConfig?.root_category_id),
  })

  await config
  return {
    props: {
      ...(await navigation),
      apolloState: client.cache.extract(),
    },
  }
}
