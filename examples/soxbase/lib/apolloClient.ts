/* eslint-disable no-console */
/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */

import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  NormalizedCacheObject,
  InMemoryCache,
  RequestHandler,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import { mergeDeep } from '@apollo/client/utilities'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import localeToStore, { defaultLocale } from '@reachdigital/magento-store/localeToStore'
import { persistCache } from 'apollo-cache-persist'
import { PersistentStorage } from 'apollo-cache-persist/types'
import type { TracingFormat } from 'apollo-tracing'
import fragments from '../generated/fragments.json'
// import MutationQueueLink from '@adobe/apollo-link-mutation-queue'
import typePolicies from './typePolicies'

export function createApolloClient(
  locale: string,
  initialState: NormalizedCacheObject = {},
): ApolloClient<NormalizedCacheObject> {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.forEach(({ message, locations, path }) =>
        console.error(
          `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
        ),
      )
    }
    if (networkError) {
      console.error(`[Network error]: ${networkError}`)
    }
  })

  const cache = new InMemoryCache({
    possibleTypes: fragments.possibleTypes,
    typePolicies,
  })

  const authLink = setContext((_, { headers }) => {
    let authorization = ''
    try {
      const query = cache.readQuery({ query: CustomerTokenDocument })
      if (query?.customerToken?.token) {
        authorization = `Bearer ${query?.customerToken?.token}`
      }
    } catch (error) {
      // nothing to do
    }

    // todo: Content-Currency
    // todo: Preview-Version
    // tood: X-Captcha
    return {
      headers: {
        ...headers,
        authorization,
        store: localeToStore(locale),
      },
    }
  })

  const links: (ApolloLink | RequestHandler)[] = [
    // new MutationQueueLink(),
    new RetryLink({ attempts: { max: 2 } }),
    errorLink,
    authLink,
    new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      credentials: 'same-origin',
    }),
  ]

  if (typeof window === 'undefined') {
    const slowOperationThreshold = 1000
    const slowResolverThreshold = 300

    const measurePerformanceLink = new ApolloLink((operation, forward) => {
      // Called before operation is sent to server
      operation.setContext({ measurePerformanceLinkStart: new Date().valueOf() })
      return forward(operation).map((data) => {
        // Called after server responds
        const time: number =
          new Date().valueOf() - (operation.getContext().measurePerformanceLinkStart as number)
        let vars =
          Object.keys(operation.variables).length > 0
            ? `(${JSON.stringify(operation.variables)})`
            : ''
        if (vars.length > 100) {
          vars = `${vars.substr(0, 100)}…`
        }

        if (data.extensions?.tracing && time > slowOperationThreshold) {
          const tracing = data.extensions?.tracing as TracingFormat

          const duration = Math.round(tracing.duration / (1000 * 1000))

          console.group(`[slow] ${operation.operationName}${vars}`)
          console.info(`operations ${duration}ms, mesh: ${time - duration}ms`)

          tracing.execution.resolvers
            .filter((resolver) => resolver.duration > slowResolverThreshold * 1000 * 1000)
            .forEach((resolver) =>
              console.info(
                `${operation.operationName}.${resolver.path.join('.')}[${Math.round(
                  resolver.duration / (1000 * 1000),
                )}ms]`,
              ),
            )
          console.groupEnd()
        }

        return data
      })
    })
    links.unshift(measurePerformanceLink)
  }

  const link = ApolloLink.from(links)

  let state = initialState

  if (typeof window !== 'undefined') {
    if (window.localStorage.getItem('apollo-cache-persist')) {
      state = mergeDeep(
        JSON.parse(window.localStorage.getItem('apollo-cache-persist') ?? '{}'),
        initialState,
      )
      window.localStorage.setItem('apollo-cache-persist', JSON.stringify(state))
    }
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    persistCache({ cache, storage: window.localStorage as PersistentStorage<unknown> })
  }

  cache.restore(state)

  return new ApolloClient({ link, cache })
}

const sharedClient: {
  [locale: string]: ApolloClient<NormalizedCacheObject>
} = {}

export default function apolloClient(
  locale: string | undefined = defaultLocale(),
  shared = typeof window !== 'undefined',
  state?: NormalizedCacheObject,
): ApolloClient<NormalizedCacheObject> {
  if (!locale) throw Error('Locale not specified to apolloClient(locale, shared, state)')
  if (!shared) return createApolloClient(locale, state)

  // Update the shared client with the new state.
  if (sharedClient[locale] && state) {
    sharedClient[locale].cache.restore(mergeDeep(sharedClient[locale].cache.extract(), state))
  }

  // Create a client if it doesn't exist
  if (!sharedClient[locale]) {
    sharedClient[locale] = createApolloClient(locale, state)
  }

  return sharedClient[locale]
}
