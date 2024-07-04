import {
  ApolloClient,
  NormalizedCacheObject,
  ApolloLink,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  DefaultOptions,
} from '@apollo/client'
// eslint-disable-next-line import/no-extraneous-dependencies
import { useStorefrontConfig } from '@graphcommerce/next-ui/hooks/useStorefrontConfig'
import type { AppProps } from 'next/app'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  ApolloClientConfig,
  graphqlConfig,
  ApolloClientConfigInput,
  PreviewConfig,
} from '../../config'
import fragments from '../../generated/fragments.json'
import { createCacheReviver } from './createCacheReviver'
import { errorLink } from './errorLink'
import { measurePerformanceLink } from './measurePerformanceLink'
import { mergeTypePolicies } from './typePolicies'

export const globalApolloClient: { current: ApolloClient<NormalizedCacheObject> | null } = {
  current: null,
}

export type GraphQLProviderProps = AppProps &
  Omit<ApolloClientConfigInput, 'storefront'> & { children: React.ReactNode }

/**
 * The GraphQLProvider allows us to configure the ApolloClient and provide it to the rest of the
 * app. This component is heavily intercepted by various plugins.
 *
 * Take a look at the props to see possible customization options.
 */
export function GraphQLProvider(props: GraphQLProviderProps) {
  const { children, links, migrations, policies, pageProps, router } = props
  const state = (pageProps as { apolloState?: NormalizedCacheObject }).apolloState

  const stateRef = useRef(state)

  const storefront = useStorefrontConfig()
  const conf = graphqlConfig({
    links,
    migrations,
    policies,
    storefront,
    preview: router.isPreview,
  })
  const config = useRef<ApolloClientConfig>(conf)
  config.current = conf

  const createCache = useCallback(
    () =>
      new InMemoryCache({
        possibleTypes: fragments.possibleTypes,
        typePolicies: mergeTypePolicies(config.current.policies),
      }),
    [],
  )

  const [client] = useState(() => {
    const link = ApolloLink.from([
      ...(typeof window === 'undefined' ? [errorLink, measurePerformanceLink] : []),
      ...config.current.links,
      // The actual Http connection to the Mesh backend.
      new HttpLink({ uri: '/api/graphql', credentials: 'same-origin' }),
    ])

    const cache = createCache()
    if (stateRef.current) cache.restore(stateRef.current)

    const ssrMode = typeof window === 'undefined'
    return new ApolloClient({
      link,
      cache,
      name: 'web',
      ssrMode,
      defaultOptions: {
        preview: {
          preview: router.isPreview,
        } as PreviewConfig,
      } as DefaultOptions,
    })
  })

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    createCacheReviver(client, createCache, config.current, state)
  }, [client, createCache, state])

  globalApolloClient.current = client

  return <ApolloProvider client={globalApolloClient.current}>{children}</ApolloProvider>
}
