import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import { StoreConfigDocument } from '../StoreConfig.gql'
import { StoreConfigFragment } from '../StoreConfigFragment.gql'

export async function storeConfig(): Promise<StoreConfigFragment> {
  const result = (
    await graphqlQuery(StoreConfigDocument, {
      fetchPolicy: 'cache-first',
      cache: 'force-cache',
    })
  ).data.storeConfig
  if (!result) throw Error('No store config found')
  return result
}
