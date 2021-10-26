import { ApolloProvider } from '@apollo/client'
import { GoogleTagManagerScript, useGTMPageViewEvent } from '@graphcommerce/googletagmanager'
import { App, AppProps } from '@graphcommerce/next-ui'
import { i18n } from '@lingui/core'
import { I18nProvider } from '@lingui/react'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import ThemedProvider from '../components/Theme/ThemedProvider'
import apolloClient from '../lib/apolloClientBrowser'

type Messages = Record<
  string,
  string | Array<string | Array<string | (string | undefined) | Record<string, unknown>>>
>

export default function ThemedApp(props: AppProps) {
  const { pageProps } = props
  const { locale } = useRouter()

  useGTMPageViewEvent()

  useMemo(() => {
    import(/* webpackPreload: true */ `../locales/${locale}.po`)
      .then(({ messages }: { messages: Messages }) => {
        if (!locale) return
        i18n.load(locale, messages)
        i18n.activate(locale)
      })
      .catch(console.error)
  }, [locale])

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
