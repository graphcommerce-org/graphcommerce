import { AnimatePresence } from 'framer-motion'
import type { AppPropsType } from 'next/dist/next-server/lib/utils'
import type { Router } from 'next/router'
import { useRef } from 'react'
import Page from './Page'
import type { PageComponent, PageItem } from './types'
import { createRouterProxy, currentHistoryIdx } from './utils'

function pageScope(item: PageItem) {
  return item.Component.pageOptions?.scope?.(item) ?? item.router.asPath
}

export default function Pages(props: AppPropsType<Router> & { Component: PageComponent }) {
  const { router, Component, pageProps } = props
  const stack = useRef<PageItem[]>([])
  const historyIdx = currentHistoryIdx()
  const prevHistory = useRef<number>(-1)
  const direction = historyIdx > prevHistory.current ? 1 : -1
  prevHistory.current = historyIdx

  /** We never need to render anything beyong the current idx and we can safely omit everything */
  stack.current = stack.current.slice(0, historyIdx)

  /** Add the current page to the stack */
  stack.current.push({ Component, pageProps, router: createRouterProxy(router), historyIdx })

  let pageStack = stack.current

  /** We need to render back to the last item that doesn't need to be stacked. */
  const plainIdx = stack.current.reduce(
    (acc, item, i) => (item.Component.pageOptions?.stacked === true ? acc : i),
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
   */
  const seen = new Set<string>()
  pageStack = pageStack
    .reverse()
    .filter((stackItem) => {
      const key = pageScope(stackItem)
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .reverse()

  return (
    <AnimatePresence initial={false}>
      {pageStack.map((stackItem, stackIdx) => {
        const key = pageScope(stackItem)
        return (
          <Page
            key={key}
            scope={key}
            {...stackItem}
            stackIdx={stackIdx}
            idx={pageStack.length - 1}
            direction={direction}
          />
        )
      })}
    </AnimatePresence>
  )
}
