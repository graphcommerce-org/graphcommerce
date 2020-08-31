import { Container, Paper, DialogTitle, Typography, DialogContent } from '@material-ui/core'
import CreateCustomerForm from 'components/Customer/CreateCustomerForm'
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

const AccountCreatePage: PageWithShopLayout = () => {
  const signedOut = useSignedOutGuard()
  const { marginTop } = useHeaderSpacing()

  if (!signedOut) return <div>Already signed in, redirecting...</div>

  return (
    <>
      <PageMeta title='Create Account' metaDescription='Cart Items' metaRobots='NOINDEX, FOLLOW' />

      <Container maxWidth='sm' className={marginTop}>
        <Paper elevation={10}>
          <DialogTitle disableTypography>
            <Typography variant='h2' component='h1'>
              Create Account
            </Typography>
          </DialogTitle>
          <DialogContent>
            <CreateCustomerForm />
          </DialogContent>
        </Paper>
      </Container>
    </>
  )
}

AccountCreatePage.Layout = ShopLayout
AccountCreatePage.pageTransition = overlay

export default AccountCreatePage

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
