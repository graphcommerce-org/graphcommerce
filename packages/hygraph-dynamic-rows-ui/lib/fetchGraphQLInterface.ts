import { ApolloClient, NormalizedCacheObject, gql } from '@apollo/client'
import { createRecursiveIntrospectionQuery } from './createRecursiveIntrospectionQuery'

export const fetchGraphQLInterface = (client: ApolloClient<NormalizedCacheObject>) => {
  const introspectionQuery = createRecursiveIntrospectionQuery('ProductInterface', 4)

  return client.query({
    query: gql`
        query getSchema {
          ${introspectionQuery}
        }
      `,
  })
}
