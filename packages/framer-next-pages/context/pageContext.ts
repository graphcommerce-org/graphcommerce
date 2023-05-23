import { createContext } from 'react'

export type Direction = 1 | -1

export type PageContext = {
  /**
   * Number of steps we need to navigate back to go to the last non-overlay page and thus close the
   * overlay
   */
  closeSteps: number

  /** Number of steps we can go back inside the the current overlay */
  backSteps: number
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

  /** The overlayGroup passes to PageOptions */
  overlayGroup?: string

  /** @private */
  routerKey: string
}

export const pageContext = createContext<undefined | PageContext>(undefined)
pageContext.displayName = 'PageContext'
