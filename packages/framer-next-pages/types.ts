import { NextComponentType, NextPageContext } from 'next'
import { NextRouter } from 'next/router'
import React from 'react'

/**
 * Default:
 *
 * ```typescript
 * const default: PageOptions = {
 *   overlay: undefined,
 *   key: ({ router }) => router.asPath,
 * } as PageOptions
 * ```
 *
 * Overlay:
 *
 * ```typescript
 * const overlay: PageOptions = {
 *   overlay: 'center',
 *   key: ({ router }) => router.pathname,
 * }
 * ```
 */
export type PageOptions = {
  /**
   * Is the page an overlay? Provide a string to which 'group' they belong
   *
   * Default: `undefined`
   *
   * - Example: ``
   * - Example: `left`
   * - Example: `customer-support`
   */
  overlay?: string

  /**
   * By default the key is set to `router.pathname`, meaning that we create a new key for each pages.
   *
   * Default: `js ({router}) => router.pathname`
   */
  key?: (router: NextRouter) => string | undefined
}

export type PageComponent<T = Record<string, unknown>> = NextComponentType<NextPageContext, T> & {
  pageOptions?: PageOptions
}

export type PageItem = {
  children: React.ReactNode
  historyIdx: number
  overlay?: string
  key: string
}
