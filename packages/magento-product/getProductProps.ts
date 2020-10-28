import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { ProductPageQueryVariables, ProductPageDocument } from './ProductPage.gql'

const getProductPageProps = async (
  variables: ProductPageQueryVariables,
  client: ApolloClient<NormalizedCacheObject>,
) => {
  const productPage = client.query({ query: ProductPageDocument, variables })
  const productData = (await productPage).data
  if (!productData) throw Error('No product')
  return productData
}

export default getProductPageProps
