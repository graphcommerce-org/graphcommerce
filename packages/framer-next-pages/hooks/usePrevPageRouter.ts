import { useContext } from 'react'
import { pageRouterContext } from '../context/pageRouterContext'

/** Same as useRouter but gives back the router of the previous page. */
export function usePrevPageRouter() {
  return useContext(pageRouterContext).prevPage?.pageInfo
}
