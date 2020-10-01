import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { LayoutHeaderDocument } from 'generated/apollo'

export default async function getLayoutHeaderProps(client: ApolloClient<NormalizedCacheObject>) {
  const menu = client.query<GQLLayoutHeaderQuery>({ query: LayoutHeaderDocument })
  return (await menu).data
}
