import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import {
  HygraphAllPagesDocument,
  HygraphPagesQuery,
  HygraphPagesDocument,
  HygraphPageFragment,
} from '../graphql'

/**
 * Fetch the page content for the given urls.
 *
 * - Uses an early bailout to check to reduce hygraph calls.
 * - Implements an alias sytem to merge the content of multiple pages.
 */
async function pageContent(url: string, cached: boolean): Promise<{ data: HygraphPagesQuery }> {
  /**
   * Some routes are very generic and wil be requested very often, like 'product/global'. To reduce
   * the amount of requests to Hygraph we can cache the result of the query if requested.
   *
   * This only works in a persistent nodejs environment and doesn't work in a serverless
   * environment, because those instances get discarded.
   *
   * This comes with a downside, if the page is updated the cache will not be invalidated, resulting
   * in stale data.
   *
   * Todo: Implement next.js 13 fetch revalidation:
   * https://beta.nextjs.org/docs/data-fetching/fetching#revalidating-data
   */
  const alwaysCache = process.env.NODE_ENV !== 'development' ? 'cache-first' : undefined
  const fetchPolicy = cached ? alwaysCache : undefined

  const allRoutes = await graphqlQuery(HygraphAllPagesDocument, { fetchPolicy })

  // Only do the query when there the page is found in the allRoutes
  const found = allRoutes.data.pages.some((page) => page.url === url)

  return found
    ? graphqlQuery(HygraphPagesDocument, { variables: { url }, fetchPolicy })
    : Promise.resolve({ data: { pages: [] } })
}

export async function hygraphPageContent(
  url: string,
  additionalProperties?: Promise<object | undefined | null> | object | null,
  cached = false,
): Promise<{ data: HygraphPagesQuery }> {
  return pageContent(url, cached)
}

export type GetHygraphPageReturn = { page: Promise<HygraphPageFragment | null> }

export type HygraphSingePage = { page: HygraphPageFragment }
export type MaybeHygraphSingePage = { page?: HygraphPageFragment | null }

export function getHygraphPage(
  params: { url: string } | Promise<{ url: string }>,
  additionalProperties?: Promise<object | undefined | null> | object | null,
  cached = false,
): GetHygraphPageReturn {
  return {
    page: (async () =>
      pageContent((await params).url, cached).then((p) => p.data.pages?.[0] ?? null))(),
  }
}
