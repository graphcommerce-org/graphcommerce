import { AnimatePresence } from 'framer-motion'
import type { AppPropsType } from 'next/dist/next-server/lib/utils'
import type { NextRouter } from 'next/router'
import React, { useRef } from 'react'
import Page from './Page'
import { pageContext, pageRouterContext } from './PageContext'
import type { PageComponent, PageItem } from './types'
import { createRouterProxy, currentHistoryIdx } from './utils'

function findPlainIdx(items: PageItem[]) {
  return items.reduce((acc, item, i) => (typeof item.overlay === 'string' ? acc : i), -1)
}

type PagesProps = AppPropsType<NextRouter> & {
  Component: PageComponent
  fallback?: React.ReactNode
  fallbackKey?: string
}

export default function Pages(props: PagesProps) {
  const { router, Component, pageProps, fallback, fallbackKey } = props
  const items = useRef<PageItem[]>([])
  const idx = currentHistoryIdx()
  const prevHistory = useRef<number>(-1)
  const direction = idx > prevHistory.current ? 1 : -1
  prevHistory.current = idx

  /** We never need to render anything beyong the current idx and we can safely omit everything */
  items.current = items.current.slice(0, idx)

  /** Add the current page to the items */
  const routerProxy = createRouterProxy(router)
  const activeItem = {
    children: (
      <pageRouterContext.Provider value={routerProxy}>
        <Component {...pageProps} />
      </pageRouterContext.Provider>
    ),
    key: Component.pageOptions?.key?.(routerProxy) ?? routerProxy.asPath,
    overlay: Component.pageOptions?.overlay,
    historyIdx: idx,
  }
  items.current.push(activeItem)

  let renderItems = items.current

  /** We need to render back to the last item that isn't an overlay. */
  const plainIdx = findPlainIdx(items.current)

  /** If we don't have a plain component we add a fallback to the beginning of an item */
  if (plainIdx === -1 && fallback) {
    if (!fallbackKey) {
      throw Error('When defining a fallback you should also provide a fallbackKey')
    }
    const proxy = createRouterProxy(router)
    renderItems = [
      {
        children: <pageRouterContext.Provider value={proxy}>{fallback}</pageRouterContext.Provider>,
        key: fallbackKey,
        overlay: undefined,
        historyIdx: -1,
      },
      ...renderItems,
    ]
  }

  if (plainIdx > -1) renderItems = items.current.slice(plainIdx)

  /**
   * Cleanup the `renderItems`:
   *
   * - A key can only occur once in AnimatePresence, therfor we remove duplicates and maintain the
   *   last one as that one has the most recent props.
   * - We remove all overlays that aren't of the same overlay type
   */
  const seen = new Set<string>()
  renderItems = renderItems
    .reverse()
    .filter((item) => {
      if (seen.has(item.key)) return false
      seen.add(item.key)

      if (
        typeof activeItem.overlay === 'string' &&
        typeof item.overlay === 'string' &&
        activeItem.overlay !== item.overlay
      ) {
        return false
      }
      return true
    })
    .reverse()

  return (
    <AnimatePresence initial>
      {renderItems.map(({ children, historyIdx, key }, itemIdx) => {
        const active = itemIdx === renderItems.length - 1
        const depth = itemIdx - (renderItems.length - 1)
        return (
          <pageContext.Provider key={key} value={{ depth, active, direction }}>
            <Page active={active} historyIdx={historyIdx}>
              {children}
            </Page>
          </pageContext.Provider>
        )
      })}
    </AnimatePresence>
  )
}
