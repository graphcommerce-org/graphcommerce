import apolloClient from 'node/apolloClient'
import { CmsPageDocument } from 'generated/apollo'
import { PromiseValue } from 'type-fest'
import getUrlResolveProps from 'components/ShopLayout/getUrlResolveProps'

const getCmsPageProps = async (urlResolve: ReturnType<typeof getUrlResolveProps>) => {
  const client = await apolloClient()

  const cmsPage = client.query<GQLCmsPageQuery, GQLCmsPageQueryVariables>({
    query: CmsPageDocument,
    variables: { id: (await urlResolve).urlResolver.id },
  })

  const cmsPageData = (await cmsPage).data
  if (!cmsPageData) throw Error('Could not fetch category')

  return cmsPageData
}

export default getCmsPageProps

export type GetCmsPageProps = PromiseValue<ReturnType<typeof getCmsPageProps>>
