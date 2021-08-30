import { useContext } from 'react'
import { pageRouterContext, RouterProxy } from '../context/pageRouterContext'

/** Same as usePageRouter but gives back the router of the previous page. */
export function usePrevPageRouter(): RouterProxy | undefined {
  return useContext(pageRouterContext).prevRouter
}
