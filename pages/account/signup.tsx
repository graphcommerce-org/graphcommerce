import { Container, Paper, DialogTitle, Typography, DialogContent } from '@material-ui/core'
import getAppLayoutProps from 'components/AppLayout/getAppLayoutProps'
import useHeaderSpacing from 'components/AppLayout/useHeaderSpacing'
import SignUpForm from 'components/Customer/SignUpForm'
import useSignedOutGuard from 'components/Customer/useSignedOutGuard'
import PageMeta from 'components/PageMeta/PageMeta'
import overlay from 'components/PageTransition/overlay'
import ShopLayout, { ShopLayoutProps, PageWithShopLayout } from 'components/ShopLayout'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import apolloClient from 'lib/apolloClient'
import { GetStaticProps } from 'next'
import React from 'react'

const AccountSignUpPage: PageWithShopLayout = () => {
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

AccountSignUpPage.Layout = ShopLayout
AccountSignUpPage.pageTransition = overlay

export default AccountSignUpPage

export const getStaticProps: GetStaticProps<ShopLayoutProps> = async () => {
  const client = apolloClient()
  const staticClient = apolloClient()
  const config = getStoreConfig(client)
  const navigation = getAppLayoutProps(staticClient, {
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
