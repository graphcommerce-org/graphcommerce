import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { ProductPageDocument, GQLProductPageQueryVariables } from 'generated/graphql'
import { PromiseValue } from 'type-fest'

const getProductPageProps = async (
  variables: GQLProductPageQueryVariables,
  client: ApolloClient<NormalizedCacheObject>,
) => {
  const productPage = client.query({ query: ProductPageDocument, variables })

  const productData = (await productPage).data
  if (!productData) throw Error('No product')
  return productData
}

export default getProductPageProps

export type GetProductPageProps = PromiseValue<ReturnType<typeof getProductPageProps>>
