import { HeaderMenuDocument } from 'generated/apollo'
import { PromiseValue } from 'type-fest'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

export default async function getHeaderProps(client: ApolloClient<NormalizedCacheObject>) {
  const config = getStoreConfig(client)

  const menu = client.query<GQLHeaderMenuQuery, GQLHeaderMenuQueryVariables>({
    query: HeaderMenuDocument,
    variables: {
      rootCategory: String((await config).storeConfig?.root_category_id),
    },
  })

  return (await menu).data
}

export type GetHeaderProps = PromiseValue<ReturnType<typeof getHeaderProps>>
