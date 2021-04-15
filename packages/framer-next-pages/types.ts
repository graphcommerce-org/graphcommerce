import { NextComponentType, NextPageContext } from 'next'
import { NextRouter } from 'next/router'
import React from 'react'

/**
 * Default:
 *
 * ```typescript
 * const default: PageOptions = {
 *   overlay: undefined,
 *   key: ({ router }) => router.pathname,
 * } as PageOptions
 * ```
 *
 * Overlay:
 *
 * ```typescript
 * const overlay: PageOptions = {
 *   overlay: 'bottom',
 *   key: ({ router }) => router.asPath,
 * }
 * ```
 *
 * Shared overlay between routes:
 *
 * ```typescript
 * const overlay: PageOptions = {
 *   overlay: 'bottom',
 *   key: ({ router }) => 'account',
 * }
 * ```
 */
export type PageOptions = {
  /**
   * Is the page an overlay? Provide a string to which 'group' they belong
   *
   * You probably want to provide as few different keys as possible.
   *
   * Default:
   *
   * ```ts
   * const overlay: PageOptions = {
   *   overlay: undefined,
   * }
   * ```
   *
   * Stack overlays for the `bottom` area:
   *
   * ```ts
   * const overlay: PageOptions = {
   *   overlay: 'bottom',
   * }
   * ```
   */
  overlay?: string

  /**
   * By default the key is set to `router.pathname`, meaning that we create a new key for each pages.
   *
   * Default:
   *
   * ```ts
   * const overlay: PageOptions = {
   *   key: ({ router }) => router.pathname,
   * }
   * ```
   *
   * Create a separate overlay per URL
   *
   * ```ts
   * const overlay: PageOptions = {
   *   key: ({ router }) => router.asPath,
   * }
   * ```
   *
   * Create a shared overlay for multiple overlays
   *
   * ```ts
   * const overlay: PageOptions = {
   *   key: () => 'my-shared-key',
   * }
   * ```
   */
  key?: (router: NextRouter) => string | undefined
}

export type PageComponent<T = Record<string, unknown>> = NextComponentType<NextPageContext, T> & {
  pageOptions?: PageOptions
}

export type PageItem = {
  children: React.ReactNode
  Layout: React.FC
  historyIdx: number
  overlay?: string
  key: string
}
