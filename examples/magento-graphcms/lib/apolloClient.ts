import { NormalizedCacheObject, ApolloClient } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { mergeDeep } from '@apollo/client/utilities'
import { defaultLocale } from '@graphcommerce/magento-store'
import { createApolloClient } from './createApolloClient'
import mesh from './mesh'

const sharedClient: {
  [locale: string]: ApolloClient<NormalizedCacheObject>
} = {}

const schemaLink = new SchemaLink(await mesh)

export default function apolloClient(
  locale: string | undefined = defaultLocale(),
  shared = typeof window !== 'undefined',
  state?: NormalizedCacheObject,
): ApolloClient<NormalizedCacheObject> {
  if (!locale) throw Error('Locale not specified to apolloClient(locale, shared, state)')
  if (!shared) return createApolloClient(locale, state, schemaLink)

  // Update the shared client with the new state.
  if (sharedClient[locale] && state) {
    sharedClient[locale].cache.restore(mergeDeep(sharedClient[locale].cache.extract(), state))
  }

  // Create a client if it doesn't exist
  if (!sharedClient[locale]) {
    sharedClient[locale] = createApolloClient(locale, state, schemaLink)
  }

  return sharedClient[locale]
}
