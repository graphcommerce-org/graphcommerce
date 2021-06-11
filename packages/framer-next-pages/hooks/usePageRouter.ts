import { useContext } from 'react'
import { PageRouterContext, pageRouterContext } from '../context/pageRouterContext'

/**
 * The pageRouter maintains state for the old page.
 *
 * E.g.:
 *
 * `/my-regular-page`:
 *
 * - `useRouter().asPath === '/overlay'`
 * - `usePageRouter().asPath === '/my-regular-page'` We maintain the state
 *
 * `/overlay`:
 *
 * - `useRouter().asPath === '/overlay'`
 * - `usePageRouter().asPath === '/overlay'`
 *
 * Adds an additional method: usePageRouter().go(-1)
 */
export function usePageRouter(): PageRouterContext {
  return useContext(pageRouterContext)
}
