import React from 'react'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import { RetryLink } from 'apollo-link-retry'
import MutationQueueLink from '@adobe/apollo-link-mutation-queue'
import { BrowserPersistence } from '@magento/peregrine/lib/util'
import app from '@magento/peregrine/lib/store/actions/app'
import AppContextProvider from '@magento/venia-ui/lib/components/App/contextProvider'
import { Adapter } from '@magento/venia-drivers'
// import { HeadProvider } from '@magento/venia-ui/lib/components/Head'
import store from './store'

const apiBase = '/api/graphql'

/**
 * The Venia adapter provides basic context objects: a router, a store, a
 * GraphQL client, and some common functions.
 */

// The Venia adapter is not opinionated about auth.
const authLink = setContext((_, { headers }) => {
  const storage = new BrowserPersistence()
  const token: string = storage.getItem('signin_token')

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

// @see https://www.apollographql.com/docs/link/composition/.
const apolloLink = ApolloLink.from([
  new MutationQueueLink() as ApolloLink,
  new RetryLink(),
  authLink,
  Adapter.apolloLink(apiBase),
])

// todo: HeadProvider should probably be made compatible with nextjs:
// Unhandled Runtime Error: TypeError: Cannot read property 'tagName' of null
const MagentoWrapper: React.FC = ({ children }) => {
  return (
    <Adapter apiBase={apiBase} apollo={{ link: apolloLink }} store={store}>
      <AppContextProvider>{children}</AppContextProvider>
    </Adapter>
  )
}

export default MagentoWrapper

window.addEventListener('online', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store.dispatch(app.setOnline())
})
window.addEventListener('offline', () => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  store.dispatch(app.setOffline())
})
