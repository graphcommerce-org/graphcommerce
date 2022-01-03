import { NormalizedCacheObject, ApolloClient, HttpLink } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { mergeDeep } from '@apollo/client/utilities'
import { defaultLocale, localeToStore } from '@graphcommerce/magento-store'
import { createApolloClient } from './createApolloClient'

const sharedClient: {
  [locale: string]: ApolloClient<NormalizedCacheObject>
} = {}

const fastDev =
  process.env.NODE_ENV !== 'production' &&
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT?.includes('localhost')

const mesh = fastDev ? undefined : await (await import('./mesh')).default

// We're using the HttpLink for development environments so it doesn't have to reload the mesh on every dev change.
function schemaLink(locale: string) {
  return mesh
    ? new SchemaLink({ ...mesh, context: { headers: { store: localeToStore(locale) } } })
    : new HttpLink({ uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT })
}

export default function apolloClient(
  locale: string | undefined = defaultLocale(),
  shared = typeof window !== 'undefined',
  state?: NormalizedCacheObject,
): ApolloClient<NormalizedCacheObject> {
  if (!shared) {
    return createApolloClient(locale, schemaLink(locale), state)
  }

  // Update the shared client with the new state.
  if (sharedClient[locale] && state && Object.keys(state).length > 0) {
    sharedClient[locale].cache.restore(mergeDeep(sharedClient[locale].cache.extract(), state))
  }

  // Create a client if it doesn't exist
  if (!sharedClient[locale]) {
    sharedClient[locale] = createApolloClient(locale, schemaLink(locale), state)
  }

  return sharedClient[locale]
}
