import { ApolloProvider } from '@apollo/client'
import { GoogleTagManagerScript, useGTMPageViewEvent } from '@graphcommerce/googletagmanager'
import { App, AppProps } from '@graphcommerce/next-ui'
import { StyledEngineProvider } from '@mui/material'
import { useRouter } from 'next/router'
import React from 'react'
import ThemedProvider from '../components/Theme/ThemedProvider'
import apolloClient from '../lib/apolloClient'

export default function ThemedApp(props: AppProps) {
  const { pageProps } = props
  const { locale } = useRouter()

  useGTMPageViewEvent()

  return (
    <>
      <GoogleTagManagerScript />
      <StyledEngineProvider injectFirst>
        <ApolloProvider client={apolloClient(locale, true, pageProps.apolloState)}>
          <ThemedProvider>
            <App {...props} />
          </ThemedProvider>
        </ApolloProvider>
      </StyledEngineProvider>
    </>
  )
}
