import { NextRouter } from 'next/router'
import { createContext, useContext } from 'react'

export const pageRouterContext = createContext(undefined as unknown as NextRouter)

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
 */
export function usePageRouter() {
  return useContext(pageRouterContext)
}
