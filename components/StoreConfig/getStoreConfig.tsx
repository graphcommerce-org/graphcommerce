import apolloClient from 'node/apolloClient'
import { PromiseValue } from 'type-fest'
import { StoreConfigDocument } from 'generated/apollo'
import { ApolloQueryResult } from 'apollo-client'

let storeConfig: Promise<ApolloQueryResult<GQLStoreConfigQuery>> | undefined

export default async function getStoreConfig() {
  if (!storeConfig) {
    const client = await apolloClient()
    storeConfig = client.query<GQLStoreConfigQuery, GQLStoreConfigQueryVariables>({
      query: StoreConfigDocument,
    })
  }

  return (await storeConfig).data
}

export type GetUrlResolveProps = PromiseValue<ReturnType<typeof getStoreConfig>>
