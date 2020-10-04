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
import { persistCache } from 'apollo-cache-persist'
import { CustomerTokenDocument } from 'generated/documents'
import fragments from 'generated/fragments.json'
import { deferLink } from './deferLink'
// import MutationQueueLink from '@adobe/apollo-link-mutation-queue'
import typePolicies from './typePolicies'

export function createApolloClient(
  initialState: NormalizedCacheObject = {},
): ApolloClient<NormalizedCacheObject> {
  let link: ApolloLink

  if (typeof window === 'undefined') {
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

    link = deferLink(async () => {
      const { mesh } = await import('node/meshSchema')
      const { SchemaLink } = await import('@apollo/client/link/schema')
      const { schema } = await mesh
      return errorLink.concat(new SchemaLink({ schema }))
    })

    const cache = new InMemoryCache({
      possibleTypes: fragments.possibleTypes,
    }).restore(initialState)

    return new ApolloClient({
      link,
      cache,
      connectToDevTools: true,
    })
  }

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

    return {
      headers: {
        ...headers,
        authorization,
      },
    }
  })

  link = ApolloLink.from([
    // new MutationQueueLink(),
    new RetryLink(),
    authLink,
    new HttpLink({
      uri: '/api/graphql',
      credentials: 'same-origin',
    }),
  ])

  let state = initialState
  if (window.localStorage.getItem('apollo-cache-persist')) {
    state = mergeDeep(
      JSON.parse(window.localStorage.getItem('apollo-cache-persist') ?? '{}'),
      initialState,
    )
    window.localStorage.setItem('apollo-cache-persist', JSON.stringify(state))
  }

  // eslint-disable-next-line @typescript-eslint/no-floating-promises
  persistCache({ cache, storage: window.localStorage })
  cache.restore(state)

  return new ApolloClient({ link, cache })
}

let globalClient: ApolloClient<NormalizedCacheObject> | undefined

export default function apolloClient(
  state: NormalizedCacheObject = {},
): ApolloClient<NormalizedCacheObject> {
  // if (typeof window === 'undefined') return createApolloClient(state)
  if (globalClient) globalClient.cache.restore(mergeDeep(globalClient.cache.extract(), state))
  else globalClient = createApolloClient(state)
  return globalClient
}
