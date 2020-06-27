import React from 'react'
import { CssBaseline } from '@material-ui/core'
import Head from 'next/head'
import { LayoutPage } from 'components/LayoutPage'
import ThemedProvider, { defaultTheme } from 'components/Theme'
import PageLoadIndicator from 'components/PageLoadIndicator'
import Link from 'next/link'
import Error from 'next/error'
import MagentoDynamic from 'components/MagentoDynamic/MagentoDynamic'
import CartTriggerSkeleton from 'components/MagentoDynamic/CartTriggerSkeleton'
import { GetNavigationProps } from './getNavigationProps'
import { GetUrlResolveProps } from './getUrlResolveProps'

export type ShopLayoutProps = GetNavigationProps & GetUrlResolveProps & { error?: string }

export type PageWithShopLayout<T = Record<string, unknown>> = LayoutPage<
  ShopLayoutProps & T,
  ShopLayoutProps
>

const ShopLayout: PageWithShopLayout['layout'] = ({ children, menu, error, urlResolver }) => {
  if (!urlResolver || !urlResolver.id) return <Error statusCode={404}>{error}</Error>
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
      {menu &&
        menu[0] &&
        menu[0].children.map((child) => (
          <Link href='/[...url]' as={`/${child.url_path}`} key={child.id}>
            <a>{child.name}</a>
          </Link>
        ))}
      <MagentoDynamic
        loader={() => import('@magento/venia-ui/lib/components/Header/cartTrigger')}
        skeleton={(ref) => <CartTriggerSkeleton ref={ref} />}
      />
      <MagentoDynamic
        loader={() => import('@magento/venia-ui/lib/components/MiniCart')}
        skeleton={(ref) => <div ref={ref} />}
      />
      {children}
      <script src='https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver' />
    </ThemedProvider>
  )
}

export default ShopLayout
