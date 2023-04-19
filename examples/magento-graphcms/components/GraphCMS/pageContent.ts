import { ApolloClient, NormalizedCacheObject } from '@graphcommerce/graphql'
import { DefaultPageDocument, DefaultPageQuery } from '../../graphql/DefaultPage.gql'
import { AllPageRoutesDocument } from './AllPageRoutes.gql'
import { DynamicRowDocument } from './DynamicRow.gql'
import {
  ConditionAndFragment,
  ConditionNumberFragment,
  ConditionOrFragment,
  ConditionTextFragment,
} from './Conditions.gql'

export type ConditionsInput = {
  numeric: DynamicRowConditionNumericWhereInput[]
  string: DynamicRowConditionStringWhereInput[]
}

type Conditions = { property: string; value: string | number | bigint }[]

/**
 * Fetch the page content for the given urls.
 *
 * - Uses an early bailout to check to reduce hygraph calls.
 * - Implements an alias sytem to merge the content of multiple pages.
 */
export async function hygraphPageContent(
  client: ApolloClient<NormalizedCacheObject>,
  url: string,
  properties: Promise<Conditions>,
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
  const allRoutes = await client.query({
    query: AllPageRoutesDocument,
    fetchPolicy: process.env.NODE_ENV !== 'development' ? 'cache-first' : undefined,
  })

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

  // Get the required rowIds from the conditions
  const propertiesAwaited = await properties

  /** A recursive match function that is able to match a condition against the requested conditions. */
  function matchCondition(
    condition:
      | ConditionTextFragment
      | ConditionNumberFragment
      | ConditionOrFragment
      | ConditionAndFragment,
  ) {
    if (condition.__typename === 'ConditionOr')
      return condition.conditions.some((c) => matchCondition(c))

    if (condition.__typename === 'ConditionAnd')
      return condition.conditions.every((c) => matchCondition(c))

    if (condition.__typename === 'ConditionNumber') {
      const value = Number(propertiesAwaited.find((c) => c.property === condition.property)?.value)

      if (!value || Number.isNaN(value)) return false

      if (condition.operator === 'EQUAL') return value === condition.numberValue
      if (condition.operator === 'LTE') return value <= condition.numberValue
      if (condition.operator === 'GTE') return value >= condition.numberValue
    }
    if (condition.__typename === 'ConditionText') {
      const value = propertiesAwaited.find((c) => c.property === condition.property)?.value
      return value === condition.stringValue
    }

    return false
  }

  // console.dir(
  //   allRoutes.data.dynamicRows.map((r) => r.conditions),
  //   { depth: 10 },
  // )
  const rowIds = allRoutes.data.dynamicRows
    .filter((availableDynamicRow) =>
      availableDynamicRow.conditions.some((row) => matchCondition(row)),
    )
    .map((row) => row.id)

  const dynamicRows =
    rowIds.length !== 0
      ? client.query({ query: DynamicRowDocument, variables: { rowIds } })
      : undefined

  const [pageResult, dynamicResult] = await Promise.all([pageQuery, dynamicRows])

  // Create a copy of the content array.
  const content = [...(pageResult.data.pages[0]?.content ?? [])]

  dynamicResult?.data.dynamicRows.forEach((dynamicRow) => {
    const { placement, target, row } = dynamicRow
    if (!row) return
    if (!target) {
      if (placement === 'BEFORE') content.unshift(row)
      else content.push(row)
      return
    }

    const targetIdx = content.findIndex((c) => c.id === target.id)
    if (placement === 'BEFORE') content.splice(targetIdx, 0, row)
    if (placement === 'AFTER') content.splice(targetIdx + 1, 0, row)
    if (placement === 'REPLACE') content.splice(targetIdx, 1, row)
  })

  // Return the merged page result.
  return { data: { ...pageResult.data, pages: [{ ...pageResult.data.pages[0], content }] } }
}

/**
 * - Aantal queries minimaliseren?
 * - Boven de product description zetten?
 * - Hoe gaan we dit optioneel maken?
 * - Hoe gaan we dit upgradebaar maken?
 */
