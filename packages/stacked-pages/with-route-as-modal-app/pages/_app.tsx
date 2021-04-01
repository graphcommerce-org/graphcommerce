import { AnimatePresence } from 'framer-motion'
import {
  AppInitialProps,
  AppPropsType,
  NextComponentType,
  NextPageContext,
} from 'next/dist/next-server/lib/utils'
import { NextRouter, Router } from 'next/router'
import React, { createContext, useCallback, useContext, useRef } from 'react'

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

type StackedPageProps = AppInitialProps & { router: NextRouter; Component: PageComponent }

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

function StackedPage(props: StackedPageProps & { idx: number; stackIdx: number; scope: string }) {
  const { Component, pageProps, router, stackIdx, idx, scope } = props
  const isFocus = stackIdx - idx

  const calc = useCallback(() => (!isFocus ? scrollPos(stackIdx).y * -1 : 0), [isFocus, stackIdx])
  const y = calc()

  return (
    <context.Provider value={{ router, level: stackIdx - idx }}>
      <div
        data-scope={scope}
        data-idx={stackIdx}
        style={{ position: isFocus ? 'absolute' : 'fixed', top: y, left: 0, right: 0 }}
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

function scope(item: StackedPageProps) {
  return item.Component.stackOptions?.scope(item) ?? item.router.asPath
}

export default function StackedPages(props: AppPropsType<Router> & { Component: PageComponent }) {
  const { router, Component, pageProps } = props
  const stack = useRef<StackedPageProps[]>([])
  const idx = Number(global.window?.history.state?.idx ?? 0)

  // We never need to render anything beyong the current idx and we can safely omit everything
  stack.current = stack.current.slice(0, idx)
  stack.current.push({ Component, pageProps, router: createRouterProxy(router) })

  let renderStack = stack.current

  // Find the the last item of a non-stack item
  const plainIdx = stack.current.reduce(
    (acc, item, i) => (item.Component.stackOptions?.stack === true ? acc : i),
    -1,
  )
  if (plainIdx > -1) renderStack = stack.current.slice(plainIdx)

  // Since a key can only occur once in AnimatePresence, we remove the key
  const seen = new Set<string>()
  renderStack = renderStack
    .reverse()
    .filter((stackItem) => {
      const key = scope(stackItem)
      if (seen.has(key)) return false
      seen.add(key)
      return true
    })
    .reverse()

  return (
    <AnimatePresence initial={false}>
      {renderStack.map((stackItem, stackIdx) => {
        const key = scope(stackItem)
        return (
          <StackedPage
            key={key}
            scope={key}
            {...stackItem}
            stackIdx={stackIdx}
            idx={renderStack.length - 1}
          />
        )
      })}
    </AnimatePresence>
  )
}
