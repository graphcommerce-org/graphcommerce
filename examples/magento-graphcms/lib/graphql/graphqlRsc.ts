import 'server-only'
import {
  ApolloClient,
  ApolloLink,
  errorLink,
  measurePerformanceLink,
  InMemoryCache,
  fragments,
  HttpLink,
} from '@graphcommerce/graphql'
import { magentoTypePolicies } from '@graphcommerce/magento-graphql'

export function apolloClient(locale: string) {
  return new ApolloClient({
    link: ApolloLink.from([
      measurePerformanceLink,
      errorLink,
      // createHygraphLink(locale),
      // Add the correct store header for the Magento user.
      // createStoreLink(locale),
      new HttpLink({ uri: 'https://graphcommerce.vercel.app/api/graphql' }),
    ]),
    cache: new InMemoryCache({
      possibleTypes: fragments.possibleTypes,
      typePolicies: magentoTypePolicies,
    }),
    ssrMode: true,
    name: 'ssr',
    defaultOptions: { query: { errorPolicy: 'all' } },
  })
}
