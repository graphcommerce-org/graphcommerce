import useSignedInGuard from 'components/Customer/useSignedInGuard'
import getHeaderProps from 'components/Header/getHeaderProps'
import PageMeta from 'components/PageMeta/PageMeta'
import overlay from 'components/PageTransition/overlay'
import ShopLayout, { ShopLayoutProps, PageWithShopLayout } from 'components/ShopLayout'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import { useCustomerQuery } from 'generated/apollo'
import apolloClient from 'lib/apolloClient'
import { GetStaticProps } from 'next'
import React from 'react'

const AccountPage: PageWithShopLayout = () => {
  const signedIn = useSignedInGuard()
  const { data } = useCustomerQuery()

  if (!signedIn) return <div>Not signed in, redirecting...</div>
  return (
    <>
      <PageMeta title='Account' metaDescription='Cart Items' metaRobots='NOINDEX, FOLLOW' />
    </>
  )
}

AccountPage.Layout = ShopLayout
AccountPage.pageTransition = overlay

export default AccountPage

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
