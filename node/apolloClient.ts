/* eslint-disable no-plusplus */
import fragments from 'generated/fragments.json'
import { SchemaLink } from '@apollo/client/link/schema'
import meshSchema from 'node/meshSchema'
import { onError } from '@apollo/client/link/error'
import { ApolloClient, InMemoryCache, IdGetterObj } from '@apollo/client'

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

export default async function apolloClient() {
  if (typeof window !== 'undefined') throw Error('Should not run on the client')
  const link = new SchemaLink({ schema: await meshSchema })

  return new ApolloClient({
    ssrMode: true,
    link: errorLink.concat(link),
    cache: new InMemoryCache({
      possibleTypes: fragments.possibleTypes,
    }),
  })
}
