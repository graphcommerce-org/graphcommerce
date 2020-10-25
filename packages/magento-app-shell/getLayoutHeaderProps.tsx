import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export default async function getLayoutHeaderProps(client: ApolloClient<NormalizedCacheObject>) {
  return (await client.query({ query: LayoutHeaderDocument })).data as Required<
    GQLLayoutHeaderQuery
  >
}
