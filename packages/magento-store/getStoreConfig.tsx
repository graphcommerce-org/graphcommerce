import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { PromiseValue } from 'type-fest'
import { StoreConfigDocument } from './StoreConfig.gql'

export default async function getStoreConfig(client: ApolloClient<NormalizedCacheObject>) {
  const { data } = await client.query({ query: StoreConfigDocument })
  if (!data) throw Error('Store Config could not be loaded')
  return data
}

export type GetUrlResolveProps = PromiseValue<ReturnType<typeof getStoreConfig>>
