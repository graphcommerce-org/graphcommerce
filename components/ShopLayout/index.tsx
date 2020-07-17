import React from 'react'
import Head from 'next/head'
import { LayoutPage } from 'components/LayoutPage'
import ThemedProvider, { defaultTheme } from 'components/Theme'
import PageLoadIndicator from 'components/PageLoadIndicator'
import Header from 'components/Header'
import { GetHeaderProps } from 'components/Header/getHeaderProps'
import { CssBaseline } from '@material-ui/core'
import { SetOptional } from 'type-fest'
import { TransitionPage } from 'components/PageTransition'
import { GetUrlResolveProps } from './getUrlResolveProps'

export type ShopLayoutProps = SetOptional<GetHeaderProps & GetUrlResolveProps>

export type PageWithShopLayout<T = Record<string, unknown>> = LayoutPage<
  SetOptional<T>,
  ShopLayoutProps
> &
  TransitionPage<SetOptional<T>>

const ShopLayout: PageWithShopLayout['Layout'] = ({ children, menu, urlResolver }) => {
  return (
    <ThemedProvider>
      <Head>
        <meta name='theme-color' content={defaultTheme.palette.primary.main} />
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        <meta name='application-name' content='Reach Digital' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='Reach Digital' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <link rel='apple-touch-icon' href='/manifest/icon-512-512.png' />
        <link rel='manifest' href='/manifest.webmanifest' />
        <link rel='shortcut icon' href='/manifest/favicon.ico' />
      </Head>
      <CssBaseline />
      <PageLoadIndicator />
      <Header menu={menu} urlResolver={urlResolver} />

      {children}
      <script src='https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver' />
    </ThemedProvider>
  )
}

export default ShopLayout
