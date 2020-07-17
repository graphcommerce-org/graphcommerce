import apolloClient from 'node/apolloClient'
import { HeaderMenuDocument } from 'generated/apollo'
import { PromiseValue } from 'type-fest'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'

export default async function getHeaderProps() {
  const client = apolloClient()
  const config = getStoreConfig()

  const menu = (await client).query<GQLHeaderMenuQuery, GQLHeaderMenuQueryVariables>({
    query: HeaderMenuDocument,
    variables: {
      rootCategory: String((await config).storeConfig.root_category_id),
    },
  })

  return (await menu).data
}

export type GetHeaderProps = PromiseValue<ReturnType<typeof getHeaderProps>>
