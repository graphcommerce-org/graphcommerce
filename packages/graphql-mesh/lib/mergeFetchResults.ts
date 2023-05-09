import { FetchResult } from '@apollo/client'
import { mergeDeep, TupleToIntersection } from '@apollo/client/utilities'

export function mergeResolved<T extends FetchResult<any>[]>(sources: T): TupleToIntersection<T> {
  const acc: Partial<TupleToIntersection<T>> = {}

  sources.forEach((result) => {
    acc.data = { ...acc.data, ...result.data }
    if (result.data) acc.data = { ...acc.data, ...result.data }
    if (result.errors) acc.errors = [...(acc.errors ?? []), ...result.errors]
    if (result.extensions) acc.extensions = mergeDeep(acc.extensions ?? {}, result.extensions)
  }, {})

  return acc as TupleToIntersection<T>
}

/**
 * Utility function that merges multiple fetch results into one and merges it's errors, extension,
 * etc.
 */
export async function mergeFetchResults<T extends (FetchResult | Promise<FetchResult>)[]>(
  ...sources: T
) {
  return mergeResolved(await Promise.all(sources))
}
