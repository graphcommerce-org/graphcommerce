import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { LayoutHeaderDocument, LayoutHeaderQuery } from './Header.graphql'

export default async function getLayoutHeaderProps(client: ApolloClient<NormalizedCacheObject>) {
  return (await client.query({ query: LayoutHeaderDocument })).data as Required<LayoutHeaderQuery>
}
