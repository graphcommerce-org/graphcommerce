import { useContext } from 'react'
import { pageRouterContext } from '../context/pageRouterContext'

/** Get the upUrl of the previous page. Returns undefined in App Router context. */
export function usePrevUp() {
  return useContext(pageRouterContext)?.prevUp
}
