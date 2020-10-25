import { useQuery } from '@apollo/client'
import { useTheme } from '@material-ui/core'
import Header from '@reachdigital/magento-app-shell/Header'
import PageLayoutBase from '@reachdigital/next-ui/Page/PageLayoutBase'
import PageLoadIndicator from '@reachdigital/next-ui/PageLoadIndicator'
import Head from 'next/head'
import React, { PropsWithChildren } from 'react'

export type PageLayoutProps = Required<GQLLayoutHeaderQuery> & GQLResolveUrlQuery

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
