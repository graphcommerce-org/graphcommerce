import { ApolloProvider } from '@apollo/client'
import { GoogleRecaptchaV3Script } from '@graphcommerce/googlerecaptcha'
import { GoogleTagManagerScript } from '@graphcommerce/googletagmanager'
import { App, AppProps } from '@graphcommerce/next-ui'
import { useRouter } from 'next/router'
import React from 'react'
import ThemedProvider from '../components/Theme/ThemedProvider'
import apolloClient from '../lib/apolloClientBrowser'

export default function ThemedApp(props: AppProps) {
  const { pageProps } = props
  const { locale } = useRouter()

  return (
    <>
      <GoogleRecaptchaV3Script />
      <GoogleTagManagerScript />
      <ApolloProvider client={apolloClient(locale, true, pageProps.apolloState)}>
        <ThemedProvider
          backgroundColor={`${
            (pageProps as any as Record<string, any>).pages?.[0].backgroundColor
          } !important`}
        >
          <App {...props} />
        </ThemedProvider>
      </ApolloProvider>
    </>
  )
}
