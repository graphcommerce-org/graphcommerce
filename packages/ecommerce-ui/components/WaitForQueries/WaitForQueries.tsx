import { QueryResult } from '@graphcommerce/graphql'
import { useIsSSR } from '@graphcommerce/next-ui'
import React from 'react'

export type WaitForQueriesProps = {
  waitFor: QueryResult<any, any> | boolean | (QueryResult<any, any> | boolean)[] | undefined
  /**
   * @deprecated Will be automatically correct.
   */
  noSsr?: boolean
  children: React.ReactNode
  fallback?: React.ReactNode
}

/** Shows the fallback during: SSR, Hydration and Query Loading. */
export const WaitForQueries = (props: WaitForQueriesProps) => {
  const { waitFor, fallback, children } = props

  const mounted = !useIsSSR()

  // We are done when all queries either have data or an error.
  const isDone = (Array.isArray(waitFor) ? waitFor : [waitFor]).every((res) => {
    if (typeof res === 'boolean') return res && mounted
    return (typeof res === 'undefined' || res.data || res.error || !res.loading) && mounted
  })

  return <>{isDone && mounted ? children : fallback}</>
}
