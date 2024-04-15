import { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import { HygraphPagesQuery, HygraphPagesDocument } from '../graphql'
import { getAllHygraphPages } from './GetAllHygraphPages'

/**
 * Fetch the page content for the given urls.
 *
 * - Uses an early bailout to check to reduce hygraph calls.
 * - Implements an alias sytem to merge the content of multiple pages.
 */
async function pageContent(
  client: ApolloClient<NormalizedCacheObject>,
  url: string,
  cached: boolean,
): Promise<{ data: HygraphPagesQuery }> {
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

  const allRoutes = await getAllHygraphPages(client)
  // Only do the query when there the page is found in the allRoutes
  const found = allRoutes.some((page) => page.url === url)

  return found
    ? client.query({ query: HygraphPagesDocument, variables: { url }, fetchPolicy })
    : Promise.resolve({ data: { pages: [] } })
}

export async function hygraphPageContent(
  client: ApolloClient<NormalizedCacheObject>,
  url: string,
  additionalProperties?: Promise<object> | object,
  cached = false,
): Promise<{ data: HygraphPagesQuery }> {
  return pageContent(client, url, cached)
}
