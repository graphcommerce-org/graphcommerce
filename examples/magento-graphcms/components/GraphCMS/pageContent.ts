import { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import { AllPageRoutesDocument } from '../../graphql/AllPageRoutes.gql'
import { DefaultPageDocument, DefaultPageQuery } from '../../graphql/DefaultPage.gql'
import { DynamicRowDocument, DynamicRowQuery } from './DynamicRow.gql'

export async function pageContent(
  client: ApolloClient<NormalizedCacheObject>,
  url: string,
  matchers: string[],
  cached = false,
): Promise<{ data: DefaultPageQuery }> {
  const allRoutes = await client.query({ query: AllPageRoutesDocument, fetchPolicy: 'cache-first' })
  const found = allRoutes.data.pages.some((page) => page.url === url)
  const rowIds = allRoutes.data.dynamicRows
    .filter((row) => row.matchers.some((m) => matchers.includes(m)))
    .map((row) => row.id)

  if (!found && rowIds.length === 0) return { data: { pages: [] } }

  const pageQuery: { data: Pick<DefaultPageQuery, 'pages'> } = found
    ? await client.query({
        query: DefaultPageDocument,
        variables: { url },
        fetchPolicy: cached ? 'cache-first' : undefined,
      })
    : { data: { pages: [] } }

  const content: DefaultPageQuery['pages'][0]['content'] | never = found
    ? Array.from(pageQuery.data.pages[0].content)
    : []

  const dynamicRows: { data: Pick<DynamicRowQuery, 'dynamicRows'> } =
    rowIds.length !== 0
      ? await client.query({
          query: DynamicRowDocument,
          variables: { matchers: rowIds },
        })
      : { data: { dynamicRows: [] } }

  if (dynamicRows.data.dynamicRows.length !== 0) {
    dynamicRows.data.dynamicRows.forEach((b) => {
      if (b.content !== undefined && b.content !== null) {
        content.push(b.content)
      }
    })
  }

  const updatedPage = { ...pageQuery.data.pages[0], content }

  // todo: Implement sorting function for the content

  return { data: { pages: [updatedPage] } }
}

// console.log('BLOCK IDS: ', rowIds)
// console.log('BLOCKS: ', blocks.data.dynamicBlocks)

/**
 * Fetch the page content for the given urls.
 *
 * - Uses an early bailout to check to reduce hygraph calls.
 * - Implements an alias sytem to merge the content of multiple pages.
 */

/**
 * By fetching using an AllPageRoutes query which is cached in the client we can bail out early so
 * we limit the amount of requests to Hygraph.
 *
 * This only works in a persisten nodejs environment and doesn't work in a serverless environment,
 * because those instances get recycled.
 *
 * This comes with a downside, if a page is added it will not be picked up.
 *
 * Todo: Implement next.js 13 fetch revalidation:
 * https://beta.nextjs.org/docs/data-fetching/fetching#revalidating-data
 */

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

// const dynamicBlocks = foundMatcher
//   ? await client.query({ query: DynamicBlockDocument, variables: { matchers } })
//   : { data: { dynamicBlocks: [] } }

// A mainPage is a page that has an exact match with any of the urls requested.
// The mainPage is used as the basis for the returned data (title, description, etc.)
// const mainPage = pageQuery.data.pages.find((p) => p.url === url)

// Get the index in the urls array, based on the url or alias of the page.

// const contentPages = [...pageQuery.data.pages].sort(
//   (a, b) => pageIndex(urls, a) - pageIndex(urls, b),
// )

// const content: SinglePage['content'] = []
// contentPages.forEach((page) => page.content.forEach((i) => content.push(i)))

/**
 * How to create a generalized sorting order system:
 *
 * - Do we want to be able to add rows to various areas on a page? header, content-area, footer
 * - Or do we only want to influence the sort order of the content entries on a page?
 *
 * Doelgroep: Marketeer / Customer service
 *
 * Examples
 *
 * - ~~Global warning: Problemen met verzending bij PostNL (onder header)~~
 * - Product warning: Important securty fix now available! (onder add to cart)
 * - Banner: bij alle producten van merk X: Krijg nu plakband gratis (onder add to cart)
 * - Promotieblok/ Rows: Voor vragen over deze productgroep kunt u contact opnemen met afdeling (na
 *   een row)
 *
 * Dynamic blocks / Banner
 *
 * - Model name: Block
 * - Location: `before` | `after` | `replace`
 * - Identifier: empty | `$row-identifier`
 * - Selectors
 * - Content: Union of all (?) Row* models
 */
