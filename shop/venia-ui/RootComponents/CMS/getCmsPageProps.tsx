import apolloClient from 'node/apolloClient'
import { GetCmsPageDocument } from 'generated/apollo'
import { PromiseValue } from 'type-fest'
import getUrlResolveProps from 'shop/venia-ui/ShopLayout/getUrlResolveProps'

const getCmsPageProps = async (urlResolve: ReturnType<typeof getUrlResolveProps>) => {
  const { data } = await (await apolloClient()).query<
    GQLGetCmsPageQuery,
    GQLGetCmsPageQueryVariables
  >({
    query: GetCmsPageDocument,
    variables: { id: (await urlResolve).urlResolver.id, onServer: true },
  })
  return data
}

export default getCmsPageProps

export type GetCmsPageProps = PromiseValue<ReturnType<typeof getCmsPageProps>>
