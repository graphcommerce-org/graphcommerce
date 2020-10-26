import { useQuery } from '@apollo/client'
import { useTheme } from '@material-ui/core'
import Header from '@reachdigital/magento-app-shell/Header'
import { ResolveUrlQuery } from '@reachdigital/magento-store/ResolveUrl.graphql'
import { StoreConfigDocument } from '@reachdigital/magento-store/StoreConfig.graphql'
import PageLayoutBase from '@reachdigital/next-ui/Page/PageLayoutBase'
import PageLoadIndicator from '@reachdigital/next-ui/PageLoadIndicator'
import Head from 'next/head'
import React, { PropsWithChildren } from 'react'
import { LayoutHeaderQuery } from './Header.graphql'

export type PageLayoutProps = Required<LayoutHeaderQuery> & ResolveUrlQuery

const PageLayout = ({ children, menu, urlResolver }: PropsWithChildren<PageLayoutProps>) => {
  const theme = useTheme()
  const storeConfig = useQuery(StoreConfigDocument)
  const name = storeConfig.data?.storeConfig?.store_name ?? ''

  return (
    <PageLayoutBase name={name}>
      <Head>
        <meta name='theme-color' content={theme.palette.primary.main} />
      </Head>
      <PageLoadIndicator />
      <Header menu={menu} urlResolver={urlResolver} />
      {children}
    </PageLayoutBase>
  )
}

export default PageLayout
