import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { HeaderMenuDocument, GQLHeaderMenuQueryVariables } from 'generated/graphql'
import { PromiseValue } from 'type-fest'

export default async function getHeaderProps(
  client: ApolloClient<NormalizedCacheObject>,
  variables: GQLHeaderMenuQueryVariables,
) {
  const menu = client.query({ query: HeaderMenuDocument, variables })
  return (await menu).data
}

export type GetHeaderProps = PromiseValue<ReturnType<typeof getHeaderProps>>
