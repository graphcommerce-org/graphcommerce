import { useIsomorphicLayoutEffect } from '@graphcommerce/framer-utils'
import { QueryResult } from '@graphcommerce/graphql'
import { NoSsr, NoSsrProps } from '@mui/material'
import { useState } from 'react'

export type WaitForQueriesProps = Omit<NoSsrProps, 'defer'> & {
  waitFor: QueryResult<any, any> | QueryResult<any, any>[]
}

/**
 * Shows the fallback during: SSR, Hydration and Query Loading.
 *
 * Why not use suspense? Not support with Apollo Client yet!
 */
export const WaitForQueries = (props: WaitForQueriesProps) => {
  const { waitFor, fallback, children } = props
  const queries = Array.isArray(waitFor) ? waitFor : [waitFor]
  const isDone = queries.every(({ data, error }) => data || error)

  const [mountedState, setMountedState] = useState(false)
  useIsomorphicLayoutEffect(() => setMountedState(true), [])

  return <NoSsr fallback={fallback}>{isDone && mountedState ? children : fallback}</NoSsr>
}
