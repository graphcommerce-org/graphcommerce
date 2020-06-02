import React from 'react'
import { CssBaseline } from '@material-ui/core'
import Head from 'next/head'
import Error from 'next/error'
import { LayoutPage } from 'components/LayoutPage'
import PageMeta from 'components/PageMeta'
import ThemedProvider, { defaultTheme } from 'components/Theme'
import Header, { HeaderTheme } from 'components/Header'
import PageLoadIndicator from 'components/PageLoadIndicator'
import Footer from 'components/Footer'

export type PageLayoutProps = Omit<GQLGetPageLayoutQuery, 'pages'> & {
  page: GQLGetPageLayoutQuery['pages'][0]
  headerTheme?: HeaderTheme
}

export type PageWithLayoutFull<T = Record<string, unknown>> = LayoutPage<
  PageLayoutProps & T,
  PageLayoutProps
>

const LayoutFull: PageWithLayoutFull['layout'] = ({
  children,
  page,
  header,
  footer,
  headerTheme,
}) => {
  if (!page?.url) return <Error statusCode={404} title='Page not found' />
  if (!header) return <Error statusCode={500} title='Header not loaded' />
  if (!footer) return <Error statusCode={500} title='Footer not loaded' />

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
      <PageMeta {...page} />
      <PageLoadIndicator />
      <Header {...header} {...page} theme={headerTheme} />
      {children}
      <Footer {...footer} />
      <script src='https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver' />
    </ThemedProvider>
  )
}

export default LayoutFull
