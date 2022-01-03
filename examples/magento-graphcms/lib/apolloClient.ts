import { NormalizedCacheObject, ApolloClient } from '@apollo/client'
import { SchemaLink } from '@apollo/client/link/schema'
import { defaultLocale, localeToStore } from '@graphcommerce/magento-store'
import apolloClientBrowser from './apolloClientBrowser'
import { createApolloClient } from './createApolloClient'

const sharedClient: {
  [locale: string]: ApolloClient<NormalizedCacheObject>
} = {}

const fastDev =
  process.env.NODE_ENV !== 'production' &&
  process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT?.includes('localhost')

const mesh = fastDev ? undefined : await (await import('./mesh')).default

// We're using the HttpLink for development environments so it doesn't have to reload the mesh on every dev change.
function builder(locale: string) {
  if (!(mesh && fastDev)) throw Error('Mesh not available')
  return createApolloClient(
    locale,
    new SchemaLink({ ...mesh, context: { headers: { store: localeToStore(locale) } } }),
  )
}

export default function apolloClient(
  locale: string | undefined = defaultLocale(),
  shared = typeof window !== 'undefined',
): ApolloClient<NormalizedCacheObject> {
  if (fastDev) return apolloClientBrowser(locale, shared)

  if (!shared) return builder(locale)

  // Create a client if it doesn't exist
  if (!sharedClient[locale]) {
    sharedClient[locale] = builder(locale)
  }

  return sharedClient[locale]
}
