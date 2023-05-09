/**
 * - Boven de product description zetten? in rowrenderer zetten
 * - Hoe gaan we dit optioneel maken?
 * - Hoe gaan we dit upgradebaar maken? management sdk
 */

import { HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import { graphqlQuery } from '@graphcommerce/graphql-mesh'
import {
  AllDynamicRowsDocument,
  ConditionTextFragment,
  ConditionNumberFragment,
  ConditionOrFragment,
  ConditionAndFragment,
  DynamicRowsDocument,
} from '../graphql'

/**
 * This generally works the same way as lodash get, however, when encountering an array it will
 * return all values.
 */
function getByPath(
  value: unknown,
  query: string | Array<string | number>,
): (undefined | string | number | bigint)[] {
  const splitQuery = Array.isArray(query)
    ? query
    : query
        .replace(/(\[(\d)\])/g, '.$2')
        .replace(/^\./, '')
        .split('.')

  if (!splitQuery.length || splitQuery[0] === undefined)
    return [value as undefined | string | number | bigint]

  const key = splitQuery[0]

  if (Array.isArray(value)) {
    return value.map((item) => getByPath(item, splitQuery)).flat(1000)
  }

  if (
    typeof value !== 'object' ||
    value === null ||
    !(key in value) ||
    (value as Record<string | number, unknown>)[key] === undefined
  ) {
    return [undefined]
  }

  const res = getByPath((value as Record<string | number, unknown>)[key], splitQuery.slice(1))
  return Array.isArray(res) ? res : [res]
}

/** A recursive match function that is able to match a condition against the requested conditions. */
function matchCondition(
  condition:
    | ConditionTextFragment
    | ConditionNumberFragment
    | ConditionOrFragment
    | ConditionAndFragment,
  obj: object,
) {
  if (condition.__typename === 'ConditionOr')
    return condition.conditions.some((c) => matchCondition(c, obj))

  if (condition.__typename === 'ConditionAnd')
    return condition.conditions.every((c) => matchCondition(c, obj))

  if (condition.__typename === 'ConditionNumber') {
    return getByPath(obj, condition.property).some((v) => {
      const value = Number(v)
      if (!value || Number.isNaN(value)) return false

      if (condition.operator === 'EQUAL') return value === condition.numberValue
      if (condition.operator === 'LTE') return value <= condition.numberValue
      if (condition.operator === 'GTE') return value >= condition.numberValue
      return false
    })
  }
  if (condition.__typename === 'ConditionText') {
    return getByPath(obj, condition.property).some((value) => value === condition.stringValue)
  }

  return false
}

/**
 * Fetch the page content for the given urls.
 *
 * - Uses an early bailout to check to reduce hygraph calls.
 * - Implements an alias sytem to merge the content of multiple pages.
 */
export async function hygraphDynamicRows(
  pageQuery: Promise<{ data: HygraphPagesQuery }>,
  url: string,
  cached: boolean,
  additionalProperties?: Promise<object> | object,
): Promise<{ data: HygraphPagesQuery }> {
  const alwaysCache = process.env.NODE_ENV !== 'development' ? 'cache-first' : undefined
  const fetchPolicy = cached ? alwaysCache : undefined

  const allRoutes = await graphqlQuery(AllDynamicRowsDocument, { fetchPolicy: alwaysCache })

  // Get the required rowIds from the conditions
  const properties = { ...(await additionalProperties), url }

  const rowIds = allRoutes.data.dynamicRows
    .filter((availableDynamicRow) =>
      availableDynamicRow.conditions.some((condition) => matchCondition(condition, properties)),
    )
    .map((row) => row.id)

  const dynamicRows =
    rowIds.length !== 0
      ? graphqlQuery(DynamicRowsDocument, { variables: { rowIds }, fetchPolicy })
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

  if (!content.length) return pageResult

  // Return the merged page result.
  return { data: { ...pageResult.data, pages: [{ ...pageResult.data.pages[0], content }] } }
}
