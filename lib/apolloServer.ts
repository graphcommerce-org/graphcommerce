import ApolloClient from 'apollo-client'
import { InMemoryCache, IntrospectionFragmentMatcher, IdGetterObj } from 'apollo-cache-inmemory'
import introspectionQueryResultData from 'generated/fragments.json'
import { SchemaLink } from 'apollo-link-schema'
import { findAndParseConfig, getMesh } from '@graphql-mesh/runtime'

export const mesh = (async () => getMesh(await findAndParseConfig()))()

export async function serverClient() {
  const { schema } = await mesh
  return new ApolloClient({
    ssrMode: true,
    link: new SchemaLink({ schema }),
    cache: new InMemoryCache({
      fragmentMatcher: new IntrospectionFragmentMatcher({ introspectionQueryResultData }),
      dataIdFromObject: (value: IdGetterObj & { locale?: string }) =>
        (value.id ?? '') + (value.locale ?? ''),
    }),
  })
}
