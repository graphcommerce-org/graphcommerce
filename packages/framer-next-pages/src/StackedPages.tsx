import { AnimatePresence } from 'framer-motion'
import type { AppPropsType } from 'next/dist/next-server/lib/utils'
import type { Router } from 'next/router'
import React, { useRef } from 'react'
import StackedPage from './StackedPage'
import type { PageComponent, StackedPageItem } from './types'
import { createRouterProxy, currentHistoryIdx } from './utils'

function pageScope(item: StackedPageItem) {
  return item.Component.stackOptions?.scope?.(item) ?? item.router.asPath
}

export default function StackedPages(props: AppPropsType<Router> & { Component: PageComponent }) {
  const { router, Component, pageProps } = props
  const stack = useRef<StackedPageItem[]>([])
  const historyIdx = currentHistoryIdx()

  // We never need to render anything beyong the current idx and we can safely omit everything
  stack.current = stack.current.slice(0, historyIdx)

  // Add the current page
  stack.current.push({ Component, pageProps, router: createRouterProxy(router), historyIdx })

  let pageStack = stack.current

  // Find the the last item of a non-stack item
  const plainIdx = stack.current.reduce(
    (acc, item, i) => (item.Component.stackOptions?.stack === true ? acc : i),
    -1,
  )

  // todo(paales): When there is no plain page found, maybe we can inject a bare page?
  // if (plainIdx < 0) {}
  if (plainIdx > -1) pageStack = stack.current.slice(plainIdx)

  // Since a key can only occur once in AnimatePresence, we remove duplicates and maintain the last one as that one has the most recent props.
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
          <StackedPage
            key={key}
            scope={key}
            {...stackItem}
            stackIdx={stackIdx}
            idx={pageStack.length - 1}
          />
        )
      })}
    </AnimatePresence>
  )
}
