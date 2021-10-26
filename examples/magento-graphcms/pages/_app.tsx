import { ApolloProvider } from '@apollo/client'
import { GoogleTagManagerScript, useGTMPageViewEvent } from '@graphcommerce/googletagmanager'
import { App, AppProps } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { useRouter } from 'next/router'
import React from 'react'
import ThemedProvider from '../components/Theme/ThemedProvider'
import apolloClient from '../lib/apolloClientBrowser'
import { messages } from '../locales/nl.po'

i18n.load('en', messages)
i18n.activate('en')

export default function ThemedApp(props: AppProps) {
  const { pageProps } = props
  const { locale } = useRouter()

  useGTMPageViewEvent()

  // const msggs = import('../locales/en/messages').then(() => {})

  return (
    <>
      <GoogleTagManagerScript />
      <ApolloProvider client={apolloClient(locale, true, pageProps.apolloState)}>
        <ThemedProvider>
          <I18nProvider i18n={i18n}>
            <App {...props} />
          </I18nProvider>
        </ThemedProvider>
      </ApolloProvider>
    </>
  )
}
