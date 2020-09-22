import { DialogTitle, DialogContent, Paper, Container, Typography } from '@material-ui/core'
import SignInForm from 'components/Customer/SignInForm'
import useSignedOutGuard from 'components/Customer/useSignedOutGuard'
import getHeaderProps from 'components/Header/getHeaderProps'
import useHeaderSpacing from 'components/Header/useHeaderSpacing'
import PageMeta from 'components/PageMeta/PageMeta'
import overlay from 'components/PageTransition/overlay'
import ShopLayout, { ShopLayoutProps, PageWithShopLayout } from 'components/ShopLayout'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import { GetStaticProps } from 'next'
import React from 'react'

const AccountSignInPage: PageWithShopLayout = () => {
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

AccountSignInPage.Layout = ShopLayout
AccountSignInPage.pageTransition = overlay

export default AccountSignInPage

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
