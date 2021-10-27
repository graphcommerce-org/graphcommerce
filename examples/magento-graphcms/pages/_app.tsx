import { ApolloProvider } from '@apollo/client'
import { GoogleTagManagerScript, useGTMPageViewEvent } from '@graphcommerce/googletagmanager'
import { App, AppProps } from '@graphcommerce/next-ui'
import { CssBaseline } from '@material-ui/core'
import { useRouter } from 'next/router'
import React from 'react'
import { DarkTheme } from '../components/Theme/ThemedProvider'
import apolloClient from '../lib/apolloClientBrowser'

export default function ThemedApp(props: AppProps) {
  const { pageProps } = props
  const { locale } = useRouter()

  useGTMPageViewEvent()

  return (
    <>
      <GoogleTagManagerScript />
      <ApolloProvider client={apolloClient(locale, true, pageProps.apolloState)}>
        <DarkTheme>
          <CssBaseline />
          <App {...props} />
        </DarkTheme>
      </ApolloProvider>
    </>
  )
}
