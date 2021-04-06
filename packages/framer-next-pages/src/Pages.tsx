import { AnimatePresence } from 'framer-motion'
import type { AppPropsType } from 'next/dist/next-server/lib/utils'
import type { NextRouter, Router } from 'next/router'
import { useRef } from 'react'
import Page from './Page'
import { pageContext, pageRouterContext } from './PageContext'
import type { PageComponent, PageItem, PageOptions } from './types'
import { createRouterProxy, currentHistoryIdx } from './utils'

function pageScope(router: NextRouter, pageOptions?: PageOptions) {
  return pageOptions?.scope?.(router) ?? router.asPath
}

export default function Pages(props: AppPropsType<Router> & { Component: PageComponent }) {
  const { router, Component, pageProps } = props
  const stack = useRef<PageItem[]>([])
  const idx = currentHistoryIdx()
  const prevHistory = useRef<number>(-1)
  const direction = idx > prevHistory.current ? 1 : -1
  prevHistory.current = idx

  /** We never need to render anything beyong the current idx and we can safely omit everything */
  stack.current = stack.current.slice(0, idx)

  /** Add the current page to the stack */
  const routerProxy = createRouterProxy(router)
  const newStackItem = {
    children: (
      <pageRouterContext.Provider value={routerProxy}>
        <Component {...pageProps} />
      </pageRouterContext.Provider>
    ),
    scope: pageScope(routerProxy, Component.pageOptions),
    stack: Component.pageOptions?.stack,
    historyIdx: idx,
  }
  stack.current.push(newStackItem)

  let pageStack = stack.current

  /** We need to render back to the last item that doesn't need to be stacked. */
  const plainIdx = stack.current.reduce(
    (acc, item, i) => (typeof item.stack === 'string' ? acc : i),
    -1,
  )

  /**
   * Todo(paales): When there is no plainIdx found, we only have an overlay. It would be nice if
   * we'd be able to provide a background page in some way. *
   */
  if (plainIdx > -1) pageStack = stack.current.slice(plainIdx)

  /**
   * A key can only occur once in AnimatePresence, therfor we remove duplicates and maintain the
   * last one as that one has the most recent props.
   *
   * We remove all the items that have a stack but aren't the current page's stack
   */
  const seen = new Set<string>()
  pageStack = pageStack
    .reverse()
    .filter((stackItem) => {
      if (seen.has(stackItem.scope)) return false
      seen.add(stackItem.scope)

      if (
        typeof newStackItem.stack === 'string' &&
        typeof stackItem.stack === 'string' &&
        newStackItem.stack !== stackItem.stack
      ) {
        return false
      }
      return true
    })
    .reverse()

  return (
    <AnimatePresence initial={false}>
      {pageStack.map(({ children, historyIdx, scope }, stackIdx) => (
        <pageContext.Provider
          key={scope}
          value={{
            depth: stackIdx - (pageStack.length - 1),
            active: stackIdx === pageStack.length - 1,
            direction,
          }}
        >
          <Page active={stackIdx === pageStack.length - 1} historyIdx={historyIdx}>
            {children}
          </Page>
        </pageContext.Provider>
      ))}
    </AnimatePresence>
  )
}
