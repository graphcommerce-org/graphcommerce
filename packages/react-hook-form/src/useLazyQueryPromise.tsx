import {
  DocumentNode,
  LazyQueryHookOptions,
  LazyQueryResult,
  QueryLazyOptions,
  TypedDocumentNode,
  useLazyQuery,
} from '@apollo/client'
import { useEffect, useRef } from 'react'
import { Promisable } from 'type-fest'

export type LazyQueryTuple<Q, V> = [
  (options?: QueryLazyOptions<V>) => Promisable<LazyQueryResult<Q, V>>,
  LazyQueryResult<Q, V>,
]

/**
 * Same API as useLazyQuery, except:
 *
 * - The execute method is a promise that will return the eventual result
 */
export function useLazyQueryPromise<Q, V>(
  query: DocumentNode | TypedDocumentNode<Q, V>,
  options?: LazyQueryHookOptions<Q, V>,
): LazyQueryTuple<Q, V> {
  const [execute, result] = useLazyQuery<Q, V>(query, options)
  const ref = useRef<(value: Promisable<LazyQueryResult<Q, V>>) => void>()

  useEffect(() => {
    if (!result.called || result.loading || !ref.current) return
    ref.current(result)
    ref.current = undefined
  }, [result])

  const queryLazily = (executeOptions?: QueryLazyOptions<V>) => {
    execute(executeOptions)
    return new Promise<LazyQueryResult<Q, V>>((resolve) => {
      ref.current = resolve
    })
  }
  return [queryLazily, result]
}
