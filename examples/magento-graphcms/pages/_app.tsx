import { ApolloProvider } from '@apollo/client'
import { GoogleRecaptchaV3Script } from '@graphcommerce/googlerecaptcha'
import { GoogleTagManagerScript } from '@graphcommerce/googletagmanager'
import { LinguiProvider } from '@graphcommerce/lingui-next'
import { App, AppProps } from '@graphcommerce/next-ui'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { lightTheme } from '../components/Theme/ThemedProvider'
import apolloClient from '../lib/apolloClientBrowser'

export default function ThemedApp(props: AppProps) {
  const { pageProps } = props
  const { locale } = useRouter()

  return (
    <>
      <GoogleRecaptchaV3Script />
      <GoogleTagManagerScript />
      <ApolloProvider client={apolloClient(locale, true, pageProps.apolloState)}>
        <LinguiProvider loader={(l) => import(`../locales/${l}.po`)}>
          <CssBaseline />
          <ThemeProvider theme={lightTheme}>
            <App {...props} />
          </ThemeProvider>
        </LinguiProvider>
      </ApolloProvider>
    </>
  )
}
