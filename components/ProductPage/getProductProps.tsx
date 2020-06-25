import apolloClient from 'node/apolloClient'
import { PromiseValue } from 'type-fest'
import { ProductPageDocument } from 'generated/apollo'

const getProductPageProps = async (variables: GQLProductPageQueryVariables) => {
  const client = await apolloClient()

  const productPage = client.query<GQLProductPageQuery, GQLProductPageQueryVariables>({
    query: ProductPageDocument,
    variables,
  })
  return (await productPage).data
}

export default getProductPageProps

export type GetProductPageProps = PromiseValue<ReturnType<typeof getProductPageProps>>
