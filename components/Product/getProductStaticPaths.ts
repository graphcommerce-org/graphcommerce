import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import { GetProductStaticPathsDocument } from 'generated/apollo'

const getProductStaticPaths = async (client: ApolloClient<NormalizedCacheObject>) => {
  const config = getStoreConfig(client)

  const { data } = await client.query<
    GQLGetProductStaticPathsQuery,
    GQLGetProductStaticPathsQueryVariables
  >({
    query: GetProductStaticPathsDocument,
    variables: { rootCategory: String((await config).storeConfig?.root_category_id) },
  })

  const suffix = (await config).storeConfig?.product_url_suffix ?? ''

  type CategoryWithProducts = NonNullable<
    NonNullable<NonNullable<GQLGetProductStaticPathsQuery['categoryList']>[0]>['children']
  >[0]

  const extractChildren = (category?: CategoryWithProducts | null) => {
    if (!category) return []

    const products =
      category.products?.items?.map((product) => `${product?.url_key}${suffix}`) ?? []
    const children = category.children?.map((value) => extractChildren(value)) ?? []
    return [...products, ...children]
  }
  const paths =
    data?.categoryList
      ?.map((category) => extractChildren(category))
      .flat(10)
      .map((url: string) => ({ params: { url } })) ?? []

  return { paths, fallback: true } as const
}

export default getProductStaticPaths
