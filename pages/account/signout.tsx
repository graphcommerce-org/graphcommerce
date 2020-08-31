import { DialogTitle, DialogContent, Paper, Container, Typography } from '@material-ui/core'
import SignOutForm from 'components/Customer/SignOutForm'
import useSignedInGuard from 'components/Customer/useSignedInGuard'
import getHeaderProps from 'components/Header/getHeaderProps'
import useHeaderSpacing from 'components/Header/useHeaderSpacing'
import PageMeta from 'components/PageMeta/PageMeta'
import overlay from 'components/PageTransition/overlay'
import ShopLayout, { ShopLayoutProps, PageWithShopLayout } from 'components/ShopLayout'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import { GetStaticProps } from 'next'
import React from 'react'

const AccountSignOutPage: PageWithShopLayout = () => {
  const signedIn = useSignedInGuard()
  const { marginTop } = useHeaderSpacing()

  if (!signedIn) return <div>Not signed in, redirecting...</div>

  return (
    <>
      <PageMeta
        title='Sign out'
        metaDescription='Sign out of your account'
        metaRobots='NOINDEX, FOLLOW'
      />

      <Container maxWidth='xs' className={marginTop}>
        <Paper elevation={10}>
          <DialogTitle disableTypography>
            <Typography variant='h2' component='h1'>
              Sign Out
            </Typography>
          </DialogTitle>
          <DialogContent>
            <SignOutForm />
          </DialogContent>
        </Paper>
      </Container>
    </>
  )
}

AccountSignOutPage.Layout = ShopLayout
AccountSignOutPage.pageTransition = overlay

export default AccountSignOutPage

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
