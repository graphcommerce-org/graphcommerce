import { PromiseValue } from 'type-fest'
import { StoreConfigDocument } from 'generated/apollo'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export default async function getStoreConfig(client: ApolloClient<NormalizedCacheObject>) {
  const { data } = await client.query<GQLStoreConfigQuery, GQLStoreConfigQueryVariables>({
    query: StoreConfigDocument,
  })

  if (!data) throw Error('Store Config could not be loaded')
  return data
}

export type GetUrlResolveProps = PromiseValue<ReturnType<typeof getStoreConfig>>
