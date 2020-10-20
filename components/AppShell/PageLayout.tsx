import { useTheme } from '@material-ui/core'
import Header from 'components/AppShell/Header'
import PageLayoutBase from 'components/Page/PageLayoutBase'
import PageLoadIndicator from 'components/PageLoadIndicator'
import Head from 'next/head'
import React, { PropsWithChildren } from 'react'

export type PageLayoutProps = Required<GQLLayoutHeaderQuery> & GQLResolveUrlQuery

const PageLayout = ({ children, menu, urlResolver }: PropsWithChildren<PageLayoutProps>) => {
  const theme = useTheme()

  return (
    <PageLayoutBase>
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
