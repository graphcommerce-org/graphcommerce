import React from 'react'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { RetryLink } from 'apollo-link-retry'
import MutationQueueLink from '@adobe/apollo-link-mutation-queue'
import { Util } from '@magento/peregrine'
import app from '@magento/peregrine/lib/store/actions/app'
import AppContextProvider from '@magento/venia-ui/lib/components/App/contextProvider'
import { Adapter } from '@magento/venia-drivers'
import store from './store'

const { BrowserPersistence } = Util
const apiBase = '/api/graphql'

/**
 * The Venia adapter provides basic context objects: a router, a store, a
 * GraphQL client, and some common functions.
 */

// The Venia adapter is not opinionated about auth.
const authLink = setContext((_, { headers }) => {
  const storage = new BrowserPersistence()
  const token = storage.getItem('signin_token')

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// @see https://www.apollographql.com/docs/link/composition/.
const apolloLink = ApolloLink.from([
  new MutationQueueLink(),
  new RetryLink(),
  authLink,
  Adapter.apolloLink(apiBase),
])

const MagentoWrapper: React.FC = ({ children }) => {
  return (
    <Adapter apiBase={apiBase} apollo={{ link: apolloLink }} store={store}>
      <AppContextProvider>{children}</AppContextProvider>
    </Adapter>
  )
}

export default MagentoWrapper

window.addEventListener('online', () => {
  store.dispatch(app.setOnline())
})
window.addEventListener('offline', () => {
  store.dispatch(app.setOffline())
})
