import { QueryResult } from '@graphcommerce/graphql'
import React, { startTransition, useEffect, useState } from 'react'

export type WaitForQueriesProps = {
  waitFor: QueryResult<any, any> | boolean | (QueryResult<any, any> | boolean)[] | undefined
  children: React.ReactNode
  fallback?: React.ReactNode
}

/** Shows the fallback during: SSR, Hydration and Query Loading. */
export const WaitForQueries = (props: WaitForQueriesProps) => {
  const { waitFor, fallback, children } = props

  // Make sure the first render is always the same as the server.
  // Make sure we we use startTransition to make sure we don't get into trouble with Suspense.
  const [mounted, setMounted] = useState(false)
  useEffect(() => startTransition(() => setMounted(true)), [])

  // We are done when all queries either have data or an error.
  const isDone = (Array.isArray(waitFor) ? waitFor : [waitFor]).every((res) => {
    if (typeof res === 'boolean') return res && mounted
    return (typeof res === 'undefined' || res.data || res.error || !res.loading) && mounted
  })

  return <>{isDone && mounted ? children : fallback}</>
}
