import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { GetProductStaticPathsDocument } from '@reachdigital/magento-customer/node_modules/generated/documents'

const getProductStaticPaths = async (client: ApolloClient<NormalizedCacheObject>) => {
  const { data } = await client.query({ query: GetProductStaticPathsDocument })

  type CategoryWithProducts = NonNullable<
    NonNullable<
      NonNullable<NonNullable<GQLGetProductStaticPathsQuery['categories']>['items']>[0]
    >['children']
  >[0]

  const extractChildren = (category?: CategoryWithProducts | null) => {
    if (!category) return []

    const products = category.products?.items?.map((product) => `${product?.url_key}`) ?? []
    const children = category.children?.map((value) => extractChildren(value)) ?? []
    return [...products, ...children]
  }
  const paths =
    data?.categories?.items
      ?.map((category) => extractChildren(category))
      .flat(10)
      .map((url: string) => ({ params: { url } })) ?? []

  return { paths, fallback: true } as const
}

export default getProductStaticPaths
