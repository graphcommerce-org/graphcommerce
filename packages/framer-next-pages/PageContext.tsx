import { NextRouter } from 'next/router'
import { createContext, useContext } from 'react'

export type Direction = 1 | -1
export type PageContext = { depth: number; direction: Direction; active: boolean }

export const pageContext = createContext((undefined as unknown) as PageContext)
export const pageRouterContext = createContext((undefined as unknown) as NextRouter)

/**
 * - Will return `usePageDirection() === 1` when navigating forward
 * - Will return `usePageDirection() === -1` when navigating backs
 */
export const usePageDirection = () => useContext(pageContext).direction

/**
 * If we have multiple pages layered on top of each other we get the depth the page has.
 *
 * E.g.
 *
 * - `/my-regular-page`: `usePageDepth() === 0`
 *
 * After navigating to overlay-one:
 *
 * - `/my-regular-page`: `usePageDepth() === -1`
 * - `/overlay-one`: `usePageDepth() === 0`
 *
 * After navigation to overlay-two
 *
 * - `/my-regular-page`: `usePageDepth() === -2`
 * - `/overlay-one`: `usePageDepth() === -1`
 * - `/overlay-two`: `usePageDepth() === 0`
 */
export const usePageDepth = () => useContext(pageContext).depth

/**
 * The pageRouter maintains state for the old page.
 *
 * E.g.:
 *
 * - `/my-regular-page`:
 *
 *   - `useRouter().asPath === '/overlay'`
 *   - `usePageRouter().asPath === '/my-regular-page'` We maintain the state
 * - `/overlay`: `usePageDepth() === 0`
 *
 *   - `useRouter().asPath === '/overlay'`
 *   - `usePageRouter().asPath === '/overlay'`
 */
export const usePageRouter = () => useContext(pageRouterContext)
