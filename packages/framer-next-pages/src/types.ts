import { NextComponentType, NextPageContext } from 'next'
import { NextRouter } from 'next/router'

/**
 * Default:
 *
 * ```typescript
 * const default: StackOptions = {
 *   stack: false,
 *   scope: ({ router }) => router.asPath,
 * } as StackOptions
 * ```
 *
 * Overlay:
 *
 * ```typescript
 * const overlay: StackOptions = {
 *   stack: true,
 *   scope: ({ router }) => router.pathname,
 * }
 * ```
 */
export type StackOptions = {
  /**
   * Should the page be stacking? Overlays like modals, etc. should stack the background.
   *
   * Default: `false`
   */
  stack?: boolean
  /**
   * By default the scope is set to item.router.asPath, meaning that we create a new entry for each
   * URL. You can change the scope to something else.
   *
   * Default: ```js ({router}) => router.asPath```
   */
  scope?: (item: StackedPageItem) => string
}

export type PageComponent<T = Record<string, unknown>> = NextComponentType<NextPageContext, T> & {
  stackOptions?: StackOptions
}

export type StackedPageItem = {
  pageProps: Record<string, unknown>
  router: NextRouter
  Component: PageComponent
  historyIdx: number
}
