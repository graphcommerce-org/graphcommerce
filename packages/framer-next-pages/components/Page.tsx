import { css } from '@emotion/react'
import { m, useIsPresent } from 'framer-motion'
import React from 'react'
import type { PageItem } from '../types'

export type PageProps = Pick<PageItem, 'historyIdx'> & {
  active: boolean
  children: React.ReactNode
}

export function scrollPos(idx: number): { x: number; y: number } {
  const scroll = global.window?.sessionStorage[`__next_scroll_${idx}`]
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return scroll ? JSON.parse(scroll) : { x: 0, y: 0 }
}

export default function Page(props: PageProps) {
  const { active, historyIdx, children } = props
  const isPresent = useIsPresent()

  /** The active Page doesn't get any special treatment */
  let top: number | undefined

  /** If the Page isn't active, we offset the page */
  if (!active) top = scrollPos(historyIdx).y * -1

  /**
   * If the Page isn't present as a child of <AnimatePresence/>, but it is still present in the DOM,
   * we're navigating back, so we need to offset it.
   */
  if (!isPresent) top = scrollPos(historyIdx).y

  const position = active && isPresent ? 'absolute' : 'fixed'
  const zIndex = active ? 1 : undefined

  return (
    <m.div
      style={{ position, top, zIndex }}
      css={css({
        left: 0,
        right: 0,
        minHeight: '100vh',
        '@supports (-webkit-touch-callout: none)': {
          height: '-webkit-fill-available',
        },
      })}
    >
      {children}
    </m.div>
  )
}
