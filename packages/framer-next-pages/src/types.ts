import { NextComponentType, NextPageContext } from 'next'
import { NextRouter } from 'next/router'
import React from 'react'

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
 *   stack: 'center',
 *   scope: ({ router }) => router.pathname,
 * }
 * ```
 */
export type PageOptions = {
  /**
   * Should the page be stacking? Overlays like modals, etc. should stack.
   *
   * Default: `undefined`
   */
  stack?: string

  /**
   * By default the scope is set to item.router.asPath, meaning that we create a new entry for each
   * URL. You can change the scope to something else.
   *
   * Default: `js ({router}) => router.asPath`
   */
  scope?: (router: NextRouter) => string | undefined
}

export type PageComponent<T = Record<string, unknown>> = NextComponentType<NextPageContext, T> & {
  pageOptions?: PageOptions
}

export type PageItem = {
  children: React.ReactNode
  historyIdx: number
  stack?: string
  scope: string
}
