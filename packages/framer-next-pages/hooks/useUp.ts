import { useContext } from 'react'
import { pageRouterContext } from '../context/pageRouterContext'

/** Get the upUrl of the previous page */
export function useUp() {
  return useContext(pageRouterContext)?.up
}
