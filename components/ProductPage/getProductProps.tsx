import { PromiseValue } from 'type-fest'
import { ProductPageDocument } from 'generated/apollo'
import { ApolloClient, NormalizedCacheObject } from '@apollo/client'

const getProductPageProps = async (
  variables: GQLProductPageQueryVariables,
  client: ApolloClient<NormalizedCacheObject>,
) => {
  const productPage = client.query<GQLProductPageQuery, GQLProductPageQueryVariables>({
    query: ProductPageDocument,
    variables,
  })

  const productData = (await productPage).data
  if (!productData) throw Error('No product')
  return productData
}

export default getProductPageProps

export type GetProductPageProps = PromiseValue<ReturnType<typeof getProductPageProps>>
