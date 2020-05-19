import apolloClient from 'node/apolloClient'
import { CategoryDocument } from 'generated/apollo'
import { PromiseValue } from 'type-fest'
import { GetUrlResolveProps } from 'shop/ShopLayout/getUrlResolveProps'

const getCategoryPageProps = async (
  variables: Pick<GetUrlResolveProps, 'id'> & GQLCategoryQueryVariables,
) => {
  const { data } = await (await apolloClient()).query<GQLCategoryQuery, GQLCategoryQueryVariables>({
    query: CategoryDocument,
    variables,
  })
  return data
}

export default getCategoryPageProps

export type GetCategoryPageProps = PromiseValue<ReturnType<typeof getCategoryPageProps>>
