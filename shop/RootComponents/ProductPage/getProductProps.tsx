import apolloClient from 'node/apolloClient'
import { ProductDetailDocument } from 'generated/apollo'
import { PromiseValue } from 'type-fest'
import { GetUrlResolveProps } from 'shop/ShopLayout/getUrlResolveProps'

const getProductPageProps = async (
  variables: GetUrlResolveProps & GQLProductDetailQueryVariables,
): Promise<{ product: GQLProductDetailQuery['productDetail']['items'][0] }> => {
  const { data } = await (await apolloClient()).query<
    GQLProductDetailQuery,
    GQLProductDetailQueryVariables
  >({ query: ProductDetailDocument, variables })

  if (!data.productDetail.items.length) throw new Error('Product now found')
  return { product: data.productDetail.items[0] }
}

export default getProductPageProps

export type GetProductPageProps = PromiseValue<ReturnType<typeof getProductPageProps>>
