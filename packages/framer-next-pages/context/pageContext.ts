import { createContext, useContext } from 'react'

export type Direction = 1 | -1

export type PageContext = {
  /**
   * If we have multiple pages layered on top of each other we get the level the page has.
   *
   * E.g.
   *
   * - `/my-regular-page`: `level === 0`
   *
   * After navigating to `overlay-one`
   *
   * - `/my-regular-page`: `level === 0`
   * - `/overlay-one`: `level === 1`
   *
   * After navigation to `overlay-two`
   *
   * - `/my-regular-page`: `level === 0`
   * - `/overlay-one`: `level === 1`
   * - `/overlay-two`: `level === 2`
   */
  level: number
  /**
   * If we have multiple pages layered on top of each other we get the depth the page has.
   *
   * E.g.
   *
   * - `/my-regular-page`: `depth === 0`
   *
   * After navigating to `overlay-one`
   *
   * - `/my-regular-page`: `depth === -1`
   * - `/overlay-one`: `depth === 0`
   *
   * After navigation to `overlay-two`
   *
   * - `/my-regular-page`: `depth === -2`
   * - `/overlay-one`: `depth === -1`
   * - `/overlay-two`: `depth === 0`
   */
  depth: number
  /**
   * - `1` when navigating forward
   * - `-1` when navigating back
   */
  direction: Direction
  /** Indicator whether the current page is the active page */
  active: boolean
}

export const pageContext = createContext(undefined as unknown as PageContext)

export function usePageContext(): PageContext {
  return useContext(pageContext)
}
