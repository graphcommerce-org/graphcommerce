import { HygraphPagesQuery } from '@graphcommerce/graphcms-ui'
import {
  ConditionTextFragment,
  ConditionNumberFragment,
  ConditionOrFragment,
  ConditionAndFragment,
  DynamicRowsQuery,
} from '../graphql'

/**
 * This generally works the same way as lodash get, however, when encountering an array it will
 * return all values.
 */
export function getByPath(
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
export function matchCondition(
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

type Page = HygraphPagesQuery['pages'][number]

export function applyDynamicRows(
  dynamicRows: DynamicRowsQuery['dynamicRows'],
  incomingContent: Page['content'] = [],
) {
  // Create a copy of the content array.
  const content = [...incomingContent]
  dynamicRows.forEach((dynamicRow) => {
    const { placement, target, rows, row } = dynamicRow
    if (!rows && !row) return

    const rowsToMerge = rows
    if (row && rows.length === 0) rowsToMerge.push(row)

    if (!target) {
      if (placement === 'BEFORE') content.unshift(...rowsToMerge)
      else content.push(...rowsToMerge)
      return
    }

    const targetIdx = content.findIndex((c) => c.id === target.id)
    if (placement === 'BEFORE') content.splice(targetIdx, 0, ...rowsToMerge)
    if (placement === 'AFTER') content.splice(targetIdx + 1, 0, ...rowsToMerge)
    if (placement === 'REPLACE') content.splice(targetIdx, 1, ...rowsToMerge)
  })

  return content
}
