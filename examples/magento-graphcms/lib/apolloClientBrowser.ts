import { ApolloClient, NormalizedCacheObject, HttpLink } from '@apollo/client'
import { mergeDeep } from '@apollo/client/utilities'
import { defaultLocale } from '@graphcommerce/magento-store'
import { createApolloClient } from './createApolloClient'

const sharedClient: {
  [locale: string]: ApolloClient<NormalizedCacheObject>
} = {}

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  credentials: 'same-origin',
})

export default function apolloClient(
  locale: string | undefined = defaultLocale(),
  shared = typeof window !== 'undefined',
  state?: NormalizedCacheObject,
): ApolloClient<NormalizedCacheObject> {
  if (!locale) throw Error('Locale not specified to apolloClient(locale, shared, state)')
  if (!shared) return createApolloClient(locale, httpLink, state)

  // Update the shared client with the new state.
  if (sharedClient[locale] && state) {
    sharedClient[locale].cache.restore(mergeDeep(sharedClient[locale].cache.extract(), state))
  }

  // Create a client if it doesn't exist
  if (!sharedClient[locale]) {
    sharedClient[locale] = createApolloClient(locale, httpLink, state)
  }

  return sharedClient[locale]
}
