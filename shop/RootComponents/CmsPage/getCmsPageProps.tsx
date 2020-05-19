import apolloClient from 'node/apolloClient'
import { GetCmsPageDocument } from 'generated/apollo'
import { PromiseValue } from 'type-fest'
import { GetUrlResolveProps } from 'shop/ShopLayout/getUrlResolveProps'

const getCmsPageProps = async ({ id }: GetUrlResolveProps) => {
  const { data } = await (await apolloClient()).query<
    GQLGetCmsPageQuery,
    GQLGetCmsPageQueryVariables
  >({ query: GetCmsPageDocument, variables: { id, onServer: true } })
  return data
}

export default getCmsPageProps

export type GetCmsPageProps = PromiseValue<ReturnType<typeof getCmsPageProps>>
