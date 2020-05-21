/**
 * We overwrite this adapter to replace UNION_AND_INTERFACE_TYPES
 * todo(paales): Implement webpack replacement based on
 * https://github.com/magento/pwa-studio/blob/a5bbb1cee9fcdff99c86b52cb698a461272ea16d/packages/venia-ui/.storybook/webpack.config.js
 */

import React, { useEffect, useState, PropsWithChildren } from 'react'
import { ApolloClient } from 'apollo-client'
import { CachePersistor } from 'apollo-cache-persist'
import { ApolloProvider } from '@apollo/react-hooks'
import { createHttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
import { ApolloCache } from 'apollo-cache'
import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
  NormalizedCacheObject,
} from 'apollo-cache-inmemory'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import resolvers from '@magento/venia-ui/lib/resolvers'
import { cacheKeyFromType } from '@magento/venia-ui/lib/util/apolloCache'

import introspectionQueryResultData from 'generated/fragments.json'
import { Store } from 'redux'

/**
 * To improve initial load time, create an apollo cache object as soon as
 * this module is executed, since it doesn't depend on any component props.
 * The tradeoff is that we may be creating an instance we don't end up needing.
 */
const preInstantiatedCache = new InMemoryCache({
  dataIdFromObject: cacheKeyFromType,
  fragmentMatcher: new IntrospectionFragmentMatcher({
    introspectionQueryResultData,
  }),
})

/**
 * The counterpart to `@magento/venia-drivers` is an adapter that provides
 * context objects to the driver dependencies. The default implementation in
 * `@magento/venia-drivers` uses modules such as `react-redux`, which
 * have implicit external dependencies. This adapter provides all of them at
 * once.
 *
 * Consumers of Venia components can either implement a similar adapter and
 * wrap their Venia component trees with it, or they can override `src/drivers`
 * so its components don't depend on context and IO.
 *
 * @param {String} props.apiBase base path for url
 * @param {Object} props.apollo.cache an apollo cache instance
 * @param {Object} props.apollo.client an apollo client instance
 * @param {Object} props.apollo.link an apollo link instance
 * @param {Object} props.apollo.initialData cache data for initial state and on reset
 * @param {Object} props.store redux store to provide
 */
const VeniaAdapter = (
  props: PropsWithChildren<{
    apiBase: string
    apollo?: {
      cache?: ApolloCache<NormalizedCacheObject>
      client?: ApolloClient<NormalizedCacheObject>
      link?: ApolloLink
      initialData?: {}
    }
    store: Store
  }>,
) => {
  const { apiBase, apollo = {}, children, store } = props

  const cache = apollo.cache || preInstantiatedCache
  const link = apollo.link || VeniaAdapter.apolloLink(apiBase)
  const initialData = apollo.initialData || {}

  cache.writeData({
    data: initialData,
  })

  const persistor = new CachePersistor({
    cache,
    storage: window.localStorage,
    debug: process.env.NODE_ENV === 'development',
  })

  let apolloClient
  if (apollo.client) {
    apolloClient = apollo.client
  } else {
    apolloClient = new ApolloClient({
      cache,
      link,
      resolvers,
    })
    apolloClient.apiBase = apiBase
  }

  apolloClient.persistor = persistor
  apolloClient.onResetStore(async () =>
    cache.writeData({
      data: initialData,
    }),
  )

  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    async function initialize() {
      // On load, restore the persisted data to the apollo cache and then
      // allow rendering. You can do other async blocking stuff here.
      if (persistor) {
        await persistor.restore()
      }
      setInitialized(true)
    }
    if (!initialized) {
      initialize()
    }
  }, [initialized, persistor])

  if (!initialized) {
    // TODO: Replace with app skeleton. See PWA-547.
    return null
  }

  return (
    <ApolloProvider client={apolloClient}>
      <ReduxProvider store={store}>
        <BrowserRouter>{children}</BrowserRouter>
      </ReduxProvider>
    </ApolloProvider>
  )
}

/**
 * We attach this Link as a static method on VeniaAdapter because
 * other modules in the codebase need access to it.
 */
VeniaAdapter.apolloLink = (apiBase: string) => {
  return createHttpLink({
    uri: apiBase,
  })
}

export default VeniaAdapter
