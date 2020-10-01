import { ApolloClient, NormalizedCacheObject } from '@apollo/client'
import { CmsPageDocument } from 'generated/documents'
import { PromiseValue } from 'type-fest'

export default async function getCmsPageProps(
  identifier: string,
  client: ApolloClient<NormalizedCacheObject>,
) {
  const cmsPage = client.query({ query: CmsPageDocument, variables: { identifier } })
  const cmsPageData = (await cmsPage).data
  if (!cmsPageData) throw Error('Could not fetch category')

  return cmsPageData
}

export type GetCmsPageProps = PromiseValue<ReturnType<typeof getCmsPageProps>>
