/* eslint-disable no-plusplus */
import ApolloClient from 'apollo-client'
import { InMemoryCache, IntrospectionFragmentMatcher, IdGetterObj } from 'apollo-cache-inmemory'
import introspectionQueryResultData from 'generated/fragments.json'
import { SchemaLink } from 'apollo-link-schema'
import meshSchema from 'node/meshSchema'
import { onError } from 'apollo-link-error'

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
      fragmentMatcher: new IntrospectionFragmentMatcher({ introspectionQueryResultData }),
      dataIdFromObject: (value: IdGetterObj & { locale?: string }) =>
        (value.id ?? '') + (value.locale ?? ''),
    }),
  })
}
