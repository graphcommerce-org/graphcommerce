import {
  DocumentNode,
  LazyQueryHookOptions,
  LazyQueryResult,
  OperationVariables,
  QueryLazyOptions,
  TypedDocumentNode,
  useLazyQuery,
} from '@apollo/client'
import React from 'react'
import { Promisable } from 'type-fest'

export type LazyQueryTuple<Q, V> = [
  (options?: QueryLazyOptions<V>) => Promisable<LazyQueryResult<Q, V>>,
  LazyQueryResult<Q, V>,
]

export default function useLazyQueryPromise<Q = any, V = OperationVariables>(
  query: DocumentNode | TypedDocumentNode<Q, V>,
  options?: LazyQueryHookOptions<Q, V>,
): LazyQueryTuple<Q, V> {
  const [execute, result] = useLazyQuery<Q, V>(query, options)

  const resolveRef = React.useRef<(value: Promisable<LazyQueryResult<Q, V>>) => void>()

  React.useEffect(() => {
    if (result.called && !result.loading && resolveRef.current) {
      resolveRef.current(result)
      resolveRef.current = undefined
    }
  }, [result])

  const queryLazily = React.useCallback(
    (executeOptions?: QueryLazyOptions<V>) => {
      execute(executeOptions)
      return new Promise<LazyQueryResult<Q, V>>((resolve) => {
        resolveRef.current = resolve
      })
    },
    [execute],
  )

  return [queryLazily, result]
}
