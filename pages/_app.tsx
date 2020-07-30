import { ApolloProvider, NormalizedCacheObject } from '@apollo/client'
import { mergeDeep } from '@apollo/client/utilities/common/mergeDeep'
import { LayoutPage, isLayoutPage } from 'components/LayoutPage'
import PageTransition, { TransitionPage } from 'components/PageTransition'
import apolloClient from 'lib/apolloClient'
import { AppProps } from 'next/app'
import React, { useEffect } from 'react'

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: LayoutPage & TransitionPage }) {
  useEffect(() => {
    const styles = document.getElementById('jss-server-side')
    if (styles) styles.remove()
  })

  let pageComponents = (
    <PageTransition pageTransition={Component.pageTransition}>
      <Component {...pageProps} />
    </PageTransition>
  )

  if (isLayoutPage(Component)) {
    pageComponents = <Component.Layout {...pageProps}>{pageComponents}</Component.Layout>
  }

  const { apolloState }: { apolloState: NormalizedCacheObject } = pageProps
  const client = apolloClient(apolloState)
  if (apolloState) {
    const newState = mergeDeep(client.cache.extract(), pageProps.apolloState)
    client.cache.restore(newState)
  }

  return <ApolloProvider client={client}>{pageComponents}</ApolloProvider>
}
