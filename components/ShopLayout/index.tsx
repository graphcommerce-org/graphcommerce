import { NormalizedCacheObject } from '@apollo/client'
import { CssBaseline } from '@material-ui/core'
import AppLayout from 'components/AppLayout'
import { GetAppShellProps } from 'components/AppLayout/getAppShellProps'
import { LayoutPage } from 'components/LayoutPage'
import PageLoadIndicator from 'components/PageLoadIndicator'
import { TransitionPage } from 'components/PageTransition'
import ThemedProvider, { defaultTheme } from 'components/Theme'
import Head from 'next/head'
import React from 'react'
import { SetOptional } from 'type-fest'
import { GetUrlResolveProps } from './getUrlResolveProps'

export type ShopLayoutProps = SetOptional<GetAppShellProps & GetUrlResolveProps> & {
  apolloState: NormalizedCacheObject
}

export type PageWithShopLayout<T = Record<string, unknown>> = LayoutPage<
  SetOptional<T>,
  ShopLayoutProps
> &
  TransitionPage<SetOptional<T>>

export default function ShopLayout({ children, menu, urlResolver }) {
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
      <AppLayout menu={menu} urlResolver={urlResolver} />

      {children}
      <script src='https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver' />
    </ThemedProvider>
  )
}
