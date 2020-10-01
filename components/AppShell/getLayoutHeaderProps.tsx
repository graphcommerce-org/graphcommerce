import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { LayoutHeaderDocument } from 'generated/documents'

export default async function getLayoutHeaderProps(client: ApolloClient<NormalizedCacheObject>) {
  return (await client.query({ query: LayoutHeaderDocument })).data
}
