import { ApolloProvider } from '@apollo/client'
import App from '@reachdigital/next-ui/Page/App'
import { AppProps } from '@reachdigital/next-ui/Page/types'
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
        <script src='https://polyfill.io/v3/polyfill.min.js?features=ResizeObserver' />
      </ThemedProvider>
    </ApolloProvider>
  )
}
