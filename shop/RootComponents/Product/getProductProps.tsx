import apolloClient from 'node/apolloClient'
import { ProductDetailDocument } from 'generated/apollo'
import { PromiseValue } from 'type-fest'
import { GetUrlResolveProps } from 'shop/ShopLayout/getUrlResolveProps'

const getProductProps = async (variables: GetUrlResolveProps & GQLCategoryQueryVariables) => {
  const { data } = await (await apolloClient()).query<
    GQLProductDetailQuery,
    GQLProductDetailQueryVariables
  >({ query: ProductDetailDocument, variables })

  return data
}

export default getProductProps

export type GetProductProps = PromiseValue<ReturnType<typeof getProductProps>>
