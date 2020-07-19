import apolloClient from 'node/apolloClient'
import { PromiseValue } from 'type-fest'
import { StoreConfigDocument } from 'generated/apollo'
import { ApolloQueryResult } from '@apollo/client'

let storeConfig: Promise<ApolloQueryResult<GQLStoreConfigQuery>> | undefined

export default async function getStoreConfig() {
  if (!storeConfig) {
    storeConfig = (await apolloClient()).query<GQLStoreConfigQuery, GQLStoreConfigQueryVariables>({
      query: StoreConfigDocument,
    })
  }
  const { data } = await storeConfig
  if (!data) throw Error('hahaha')

  return data
}

export type GetUrlResolveProps = PromiseValue<ReturnType<typeof getStoreConfig>>
