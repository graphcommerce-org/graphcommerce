import { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import { AllPageRoutesDocument } from '../../graphql/AllPageRoutes.gql'
import { DefaultPageDocument, DefaultPageQuery } from '../../graphql/DefaultPage.gql'
import { DynamicRowDocument } from './DynamicRow.gql'

/**
 * Fetch the page content for the given urls.
 *
 * - Uses an early bailout to check to reduce hygraph calls.
 * - Implements an alias sytem to merge the content of multiple pages.
 */
export async function hygraphPageContent(
  client: ApolloClient<NormalizedCacheObject>,
  url: string,
  matchers: string[],
  cached = false,
): Promise<{ data: DefaultPageQuery }> {
  /**
   * By fetching using an AllPageRoutes query which is cached in the client we can limit the amount
   * of requests to Hygraph.
   *
   * This only works in a persistent nodejs environment and doesn't work in a serverless
   * environment, because those instances get discarded.
   *
   * This comes with a downside, if a page is added it will not be picked up until the server is
   * restarted.
   *
   * Todo: Implement next.js 13 fetch revalidation:
   * https://beta.nextjs.org/docs/data-fetching/fetching#revalidating-data
   */
  const allRoutes = await client.query({ query: AllPageRoutesDocument, fetchPolicy: 'cache-first' })

  /**
   * Some routes are very generic and wil be requested very often, like 'product/global'. To reduce
   * the amount of requests to Hygraph we can cache the result of the query if requested.
   *
   * This comes with a downside, if the page is updated the cache will not be invalidated, resulting
   * in stale data.
   *
   * Todo: Implement next.js 13 fetch revalidation:
   * https://beta.nextjs.org/docs/data-fetching/fetching#revalidating-data
   */
  const fetchPolicy = cached ? 'cache-first' : undefined

  // Only do the query when there the page is found in the allRoutes
  const found = allRoutes.data.pages.some((page) => page.url === url)

  const pageQuery = found
    ? client.query({ query: DefaultPageDocument, variables: { url }, fetchPolicy })
    : Promise.resolve({ data: { pages: [] } })

  // Only do the query when there are dynamic rows found in the allRoutes
  const rowIds = allRoutes.data.dynamicRows
    .filter((row) => row.matchers.some((m) => matchers.includes(m)))
    .map((row) => row.id)

  const dynamicRows =
    rowIds.length !== 0
      ? client.query({ query: DynamicRowDocument, variables: { rowIds } })
      : undefined

  const [pageResult, dynamicResult] = await Promise.all([pageQuery, dynamicRows])

  // Create a copy of the content array.
  const content = [...(pageResult.data.pages[0]?.content ?? [])]

  dynamicResult?.data.dynamicRows.forEach((dynamicRow) => {
    const { location, locationSelector, row } = dynamicRow
    if (!row) return
    if (!locationSelector) {
      if (location === 'BEFORE') content.unshift(row)
      else content.push(row)
      return
    }

    const targetIdx = content.findIndex((c) => c.identity === locationSelector)
    if (location === 'BEFORE') content.splice(targetIdx, 0, row)
    if (location === 'AFTER') content.splice(targetIdx + 1, 0, row)
    if (location === 'REPLACE') content.splice(targetIdx, 1, row)
  })

  // Return the merged page result.
  return { data: { ...pageResult.data, pages: [{ ...pageResult.data.pages[0], content }] } }
}
