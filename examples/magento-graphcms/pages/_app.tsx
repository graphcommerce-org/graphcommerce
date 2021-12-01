import { ApolloProvider } from '@apollo/client'
import { GoogleRecaptchaV3Script } from '@graphcommerce/googlerecaptcha'
import { LinguiProvider } from '@graphcommerce/lingui-next'
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
      <ApolloProvider client={apolloClient(locale, true, pageProps.apolloState)}>
        <LinguiProvider loader={(locale) => import(`../locales/${locale}.po`)}>
          <ThemedProvider>
            <App {...props} />
          </ThemedProvider>
        </LinguiProvider>
      </ApolloProvider>
    </>
  )
}
