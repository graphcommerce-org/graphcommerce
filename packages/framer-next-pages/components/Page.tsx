import { dvh } from '@graphcommerce/framer-utils'
import { m, useIsPresent } from 'framer-motion'
import React, { HTMLAttributes } from 'react'
import type { PageItem } from '../types'

export type PageProps = Pick<PageItem, 'routerKey'> & {
  active: boolean
  children: React.ReactNode
}

export function scrollPos(key: string): { x: number; y: number } {
  const scroll = global.window?.sessionStorage[`__next_scroll_${key}`] as string | undefined
  return scroll ? JSON.parse(scroll) : { x: 0, y: 0 }
}

export function Page(props: PageProps) {
  const { active, routerKey, children } = props
  const isPresent = useIsPresent()

  /** The active Page doesn't get any special treatment */
  let top: number | undefined

  /** If the Page isn't active, we offset the page */
  if (!active) top = scrollPos(routerKey).y * -1

  /**
   * If the Page isn't present as a child of <AnimatePresence/>, but it is still present in the DOM,
   * we're navigating back, so we need to offset it.
   */
  if (!isPresent) top = scrollPos(routerKey).y

  const position = active && isPresent ? 'absolute' : 'fixed'
  const zIndex = active ? 1 : undefined

  return (
    <m.div
      layoutScroll
      style={{ position, top, zIndex, minHeight: dvh(100), left: 0, right: 0 }}
      inert={!active ? ('true' as unknown as boolean) : undefined}
      data-nosnippet={!active ? true : undefined}
      aria-hidden={!active ? true : undefined}
    >
      {children}
    </m.div>
  )
}
