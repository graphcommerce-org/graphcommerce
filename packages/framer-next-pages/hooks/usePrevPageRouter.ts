import { useContext } from 'react'
import { pageRouterContext } from '../context/pageRouterContext'
import { RouterProxy } from '../types'

/** Same as usePageRouter but gives back the router of the previous page. */
export function usePrevPageRouter(): RouterProxy | undefined {
  return useContext(pageRouterContext).prevRouter
}
