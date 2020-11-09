import { ApolloClient, ApolloQueryResult, NormalizedCacheObject } from '@apollo/client'
import { GetStaticPathsResult } from 'next'
import {
  GetProductStaticPathsDocument,
  GetProductStaticPathsQuery,
} from './GetProductStaticPaths.gql'

type Return = GetStaticPathsResult<{ url: string }>

const getProductStaticPaths = async (
  client: ApolloClient<NormalizedCacheObject>,
): Promise<Return> => {
  const query = client.query({
    query: GetProductStaticPathsDocument,
    variables: { currentPage: 1 },
  })
  const pages: Promise<ApolloQueryResult<GetProductStaticPathsQuery>>[] = [query]

  const totalPages = (await query).data?.products?.page_info?.total_pages ?? 0
  if (totalPages > 1) {
    const pageNrs = Array.from({ length: totalPages - 1 }, (_, i) => i + 2)
    pageNrs.forEach((currentPage) => {
      pages.push(client.query({ query: GetProductStaticPathsDocument, variables: { currentPage } }))
    })
  }
  const paths = (await Promise.all(pages))
    .map((q) => q.data.products?.items)
    .flat(1)
    .map((p) => ({
      params: {
        url: `${p?.url_key}${p?.url_suffix}`,
      },
    }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export default getProductStaticPaths
