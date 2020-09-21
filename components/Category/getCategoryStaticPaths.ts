import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import { GetCategoryStaticPathsDocument } from 'generated/apollo'

const getCategoryStaticPaths = async (client: ApolloClient<NormalizedCacheObject>) => {
  const config = getStoreConfig(client)

  const rootCategory = String((await config).storeConfig?.root_category_id)
  const suffix = (await config).storeConfig?.category_url_suffix ?? ''

  const { data } = await client.query<
    GQLGetCategoryStaticPathsQuery,
    GQLGetCategoryStaticPathsQueryVariables
  >({ query: GetCategoryStaticPathsDocument, variables: { rootCategory } })

  type Category = { children?: Array<Category | null> | null; url_key?: string | null }
  const extractChildren = (category?: Category | null, baseUrl = '') => {
    if (!category) return []

    const url = category.url_key ? `${baseUrl}/${category.url_key ?? ''}` : baseUrl
    const children = category.children?.map((value) => extractChildren(value, url)) ?? []

    return url ? [`${url}${suffix}`, ...children] : children
  }

  const paths =
    data?.categoryList
      ?.map((category) => extractChildren(category))
      .flat(10)
      .filter((v) => !!v)
      .map((url) => ({
        params: { url: url.split('/').filter((v: string) => !!v) as string[] },
      })) ?? []

  return { paths, fallback: true } as const
}

export default getCategoryStaticPaths
