import { NextComponentType, NextPageContext } from 'next'
import { NextRouter } from 'next/router'

/**
 * Default:
 *
 * ```typescript
 * const default: PageOptions = {
 *   stack: false,
 *   scope: ({ router }) => router.asPath,
 * } as PageOptions
 * ```
 *
 * Overlay:
 *
 * ```typescript
 * const overlay: PageOptions = {
 *   stack: true,
 *   scope: ({ router }) => router.pathname,
 * }
 * ```
 */
export type PageOptions = {
  /**
   * Should the page be stacking? Overlays like modals, etc. should stack the background.
   *
   * Default: `false`
   */
  stacked?: boolean
  /**
   * By default the scope is set to item.router.asPath, meaning that we create a new entry for each
   * URL. You can change the scope to something else.
   *
   * Default: ```js ({router}) => router.asPath```
   */
  scope?: (item: PageItem) => string
}

export type PageComponent<T = Record<string, unknown>> = NextComponentType<NextPageContext, T> & {
  pageOptions?: PageOptions
}

export type PageItem = {
  pageProps: Record<string, unknown>
  router: NextRouter
  Component: PageComponent
  historyIdx: number
}
