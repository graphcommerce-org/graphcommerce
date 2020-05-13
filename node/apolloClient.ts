import ApolloClient from 'apollo-client'
import { InMemoryCache, IntrospectionFragmentMatcher, IdGetterObj } from 'apollo-cache-inmemory'
import introspectionQueryResultData from 'generated/fragments.json'
import { SchemaLink } from 'apollo-link-schema'
import meshSchema from 'node/meshSchema'

export default async function apolloClient() {
  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema: await meshSchema }),
    cache: new InMemoryCache({
      fragmentMatcher: new IntrospectionFragmentMatcher({ introspectionQueryResultData }),
      dataIdFromObject: (value: IdGetterObj & { locale?: string }) =>
        (value.id ?? '') + (value.locale ?? ''),
    }),
  })
}
