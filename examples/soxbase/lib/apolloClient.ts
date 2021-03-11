/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-var-requires */
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  NormalizedCacheObject,
  InMemoryCache,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import { mergeDeep } from '@apollo/client/utilities'
import { CustomerTokenDocument } from '@reachdigital/magento-customer/CustomerToken.gql'
import { persistCache } from 'apollo-cache-persist'
import { PersistentStorage } from 'apollo-cache-persist/types'
import fragments from '../generated/fragments.json'
// import MutationQueueLink from '@adobe/apollo-link-mutation-queue'
import typePolicies from './typePolicies'

export function createApolloClient(
  store: string,
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
    return { headers: { ...headers, authorization, store } }
  })

  const roundTripLink = new ApolloLink((operation, forward) => {
    // Called before operation is sent to server
    operation.setContext({ start: new Date() })
    return forward(operation).map((data) => {
      // Called after server responds
      const time: number = new Date().valueOf() - (operation.getContext().start as Date).valueOf()
      const vars =
        Object.keys(operation.variables).length > 0
          ? `(${JSON.stringify(operation.variables)})`
          : ''

      console.log(`query ${`${time}ms`.padEnd(7, ' ')}for '${operation.operationName}${vars}'`)
      return data
    })
  })

  const link = ApolloLink.from([
    roundTripLink,
    // new MutationQueueLink(),
    new RetryLink({ attempts: { max: 2 } }),
    errorLink,
    authLink,
    new HttpLink({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
      credentials: 'same-origin',
    }),
  ])

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

let globalClient: ApolloClient<NormalizedCacheObject> | undefined

export default function apolloClient(
  store: string,
  state: NormalizedCacheObject = {},
): ApolloClient<NormalizedCacheObject> {
  if (typeof window === 'undefined') return createApolloClient(store, state)
  if (globalClient) globalClient.cache.restore(mergeDeep(globalClient.cache.extract(), state))
  else globalClient = createApolloClient(store, state)
  return globalClient
}
