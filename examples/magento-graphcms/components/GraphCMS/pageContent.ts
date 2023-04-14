import { ApolloClient, ApolloQueryResult, NormalizedCacheObject } from '@graphcommerce/graphql'
import { AllPageRoutesDocument } from '../../graphql/AllPageRoutes.gql'
import { DefaultPageDocument, DefaultPageQuery } from '../../graphql/DefaultPage.gql'

/**
 * Fast path to fetch pageContent, it uses a cached allRoutes to check if a page exists, if not it
 * will return nothing.
 */
export async function pageContent(
  client: ApolloClient<NormalizedCacheObject>,
  url: string,
  tags: string[] = [],
  cached = false,
): Promise<Pick<ApolloQueryResult<DefaultPageQuery>, 'data'>> {
  const allRoutes = await client.query({ query: AllPageRoutesDocument, fetchPolicy: 'cache-first' })

  const found = allRoutes.data.pages.find((page) => page.url === url)

  if (!found) return { data: { pages: [] } }

  const pageQuery = await client.query({
    query: DefaultPageDocument,
    variables: { url, tags },
    fetchPolicy: cached ? 'cache-first' : undefined,
  })

  const mainPage = pageQuery.data.pages.find((page) => page.url === url) ?? pageQuery.data.pages[0]
  const content = [...mainPage.content]

  pageQuery.data.pages.forEach((p) => {
    if (p.url === url) return
    p.content.forEach((i) => {
      // todo: Decide if we want to push or unshift the content.
      content.push(i)
    })
  })

  // todo: Implement sorting function for the content

  return { ...pageQuery, data: { pages: [{ ...mainPage, content }] } }
}
