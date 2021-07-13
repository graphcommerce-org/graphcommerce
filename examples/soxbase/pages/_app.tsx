import { ApolloProvider } from '@apollo/client'
import { App, AppProps } from '@reachdigital/next-ui'
import { useRouter } from 'next/router'
import React from 'react'
import ThemedProvider from '../components/Theme/ThemedProvider'
import apolloClient from '../lib/apolloClient'

export default function ThemedApp(props: AppProps) {
  const { pageProps } = props
  const { locale } = useRouter()

  return (
    <ApolloProvider client={apolloClient(locale, true, pageProps.apolloState)}>
      <ThemedProvider>
        <App {...props} />
      </ThemedProvider>
    </ApolloProvider>
  )
}
