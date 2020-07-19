import apolloClient from 'node/apolloClient'
import { PromiseValue } from 'type-fest'
import { ProductPageDocument } from 'generated/apollo'

const getProductPageProps = async (variables: GQLProductPageQueryVariables) => {
  const client = await apolloClient()

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
