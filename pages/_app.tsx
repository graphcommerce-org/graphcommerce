import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import theme from '../theme'
import { PageMeta, Breadcrumbs, Language, isPage } from '../graphcms'

export default class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>My page</title>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width' />
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          {isPage(pageProps) && (
            <>
              <PageMeta {...pageProps} />
              <Breadcrumbs {...pageProps} />
              <Language {...pageProps} />
            </>
          )}
          <Component {...pageProps} />
        </ThemeProvider>
      </>
    )
  }
}
