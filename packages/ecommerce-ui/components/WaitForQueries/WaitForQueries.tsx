import { useIsomorphicLayoutEffect } from '@graphcommerce/framer-utils'
import { QueryResult } from '@graphcommerce/graphql'
import React, { startTransition, useState } from 'react'

export type WaitForQueriesProps = {
  waitFor: QueryResult<any, any> | QueryResult<any, any>[]
  children: React.ReactNode
  fallback?: React.ReactNode
}

/**
 * Shows the fallback during: SSR, Hydration and Query Loading.
 *
 * Why not use suspense? Not support with Apollo Client yet!
 */
export const WaitForQueries = (props: WaitForQueriesProps) => {
  const { waitFor, fallback, children } = props

  // We are done when all queries either have data or an error
  const isDone = (Array.isArray(waitFor) ? waitFor : [waitFor]).every(
    ({ data, error }) => data || error,
  )

  // Wait for the queries to finish
  const [mountedState, setMountedState] = useState(false)
  useIsomorphicLayoutEffect(() => startTransition(() => setMountedState(true)), [])

  return <>{isDone && mountedState ? children : fallback}</>
}
