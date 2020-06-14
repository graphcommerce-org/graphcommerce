import apolloClient from 'node/apolloClient'
import { CmsPageDocument } from 'generated/apollo'
import { PromiseValue } from 'type-fest'
import getUrlResolveProps from 'shop/venia-ui/ShopLayout/getUrlResolveProps'

const getCmsPageProps = async (urlResolve: ReturnType<typeof getUrlResolveProps>) => {
  const { data } = await (await apolloClient()).query<GQLCmsPageQuery, GQLCmsPageQueryVariables>({
    query: CmsPageDocument,
    variables: { id: (await urlResolve).urlResolver.id },
  })
  return data
}

export default getCmsPageProps

export type GetCmsPageProps = PromiseValue<ReturnType<typeof getCmsPageProps>>
