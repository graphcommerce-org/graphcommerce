import getStoreConfig from 'components/StoreConfig/getStoreConfig'
import { GetProductStaticPathsDocument } from 'generated/apollo'
import apolloClient from 'lib/apolloClient'
import { GetStaticPaths } from 'next'

const getProductStaticPaths: GetStaticPaths = async () => {
  const client = apolloClient()
  const config = getStoreConfig(client)

  const { data } = await client.query<
    GQLGetProductStaticPathsQuery,
    GQLGetProductStaticPathsQueryVariables
  >({
    query: GetProductStaticPathsDocument,
    variables: { rootCategory: String((await config).storeConfig?.root_category_id) },
  })

  type CategoryWithProducts = NonNullable<
    NonNullable<NonNullable<GQLGetProductStaticPathsQuery['categoryList']>[0]>['children']
  >[0]

  const extractChildren = (category?: CategoryWithProducts | null) => {
    if (!category) return []

    const products = category.products?.items?.map((product) => product?.url_key) ?? []
    const children = category.children?.map((value) => extractChildren(value)) ?? []
    return [...products, ...children]
  }
  const paths =
    data?.categoryList
      ?.map((category) => extractChildren(category))
      .flat(10)
      .map((url) => ({ params: { url } })) ?? []

  return { paths, fallback: true }
}

export default getProductStaticPaths
