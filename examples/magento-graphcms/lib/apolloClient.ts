import { NormalizedCacheObject, ApolloClient } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { mergeDeep } from '@apollo/client/utilities'
import { defaultLocale, localeToStore } from '@graphcommerce/magento-store'
import { createApolloClient } from './createApolloClient'
import mesh from './mesh'

const sharedClient: {
  [locale: string]: ApolloClient<NormalizedCacheObject>
} = {}

const resolvedMesh = await mesh

function schemaLink(locale: string) {
  return new SchemaLink({
    ...resolvedMesh,
    context: { headers: { store: localeToStore(locale) } },
  })
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
