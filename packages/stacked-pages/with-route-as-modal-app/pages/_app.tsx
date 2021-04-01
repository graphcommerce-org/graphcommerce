import { AnimatePresence, useIsPresent } from 'framer-motion'
import '../demo.css'
import {
  AppInitialProps,
  AppPropsType,
  NextComponentType,
  NextPageContext,
} from 'next/dist/next-server/lib/utils'
import { NextRouter, Router } from 'next/router'
import React, { createContext, useContext, useRef } from 'react'

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
  scope?: (item: StackedPageProps) => string
}

type PageComponent<T = Record<string, unknown>> = NextComponentType<NextPageContext, T> & {
  stackOptions?: StackOptions
}

type StackedPageProps = AppInitialProps & {
  router: NextRouter
  Component: PageComponent
  historyIdx: number
}

type StackItemContext = { router: NextRouter; level: number }
const context = createContext<StackItemContext>(undefined)

export function useStackLevel() {
  return useContext(context).level
}

export function useStackRouter() {
  return useContext(context).router
}

function scrollPos(idx: number): { x: number; y: number } {
  const scroll = global.window?.sessionStorage[`__next_scroll_${idx}`]
  return scroll ? JSON.parse(scroll) : { x: 0, y: 0 }
}

function currentHistoryIdx() {
  return Number(global.window?.history.state?.idx ?? 0)
}

function StackedPage(props: StackedPageProps & { idx: number; stackIdx: number; scope: string }) {
  const { Component, pageProps, router, stackIdx, idx, historyIdx: pageIdx, scope } = props
  const active = stackIdx === idx

  // The active StackedPage doesn't get any special treatment
  let top = 0

  // If the StackedPage isn't active, we offset the page
  if (!active) top = scrollPos(pageIdx).y * -1

  // If the StackedPage isn't present as a child of <AnimatePresence/>, but it is still present in the DOM, we change change it's top position.
  if (!useIsPresent()) top = scrollPos(currentHistoryIdx()).y - scrollPos(stackIdx).y

  return (
    <context.Provider value={{ router, level: stackIdx - idx }}>
      <div
        data-scope={scope}
        style={{ position: active ? 'absolute' : 'fixed', top, left: 0, right: 0 }}
      >
        <Component {...pageProps} />
      </div>
    </context.Provider>
  )
}

function createRouterProxy(router: NextRouter): NextRouter {
  const { asPath, pathname, query, locale } = router

  // We create an object with the current stale properties
  const routerProps = { asPath, pathname, query, locale }

  return new Proxy(router, {
    get: (target, prop: string, receiver) =>
      routerProps[prop] ?? Reflect.get(target, prop, receiver),
  })
}

function pageScope(item: StackedPageProps) {
  return item.Component.stackOptions?.scope?.(item) ?? item.router.asPath
}

export default function StackedPages(props: AppPropsType<Router> & { Component: PageComponent }) {
  const { router, Component, pageProps } = props
  const stack = useRef<StackedPageProps[]>([])
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
