import { AnimatePresence } from 'framer-motion'
import {
  AppInitialProps,
  AppPropsType,
  NextComponentType,
  NextPageContext,
} from 'next/dist/next-server/lib/utils'
import { NextRouter, Router } from 'next/router'
import React, { createContext, useContext, useRef } from 'react'

type PageComponent = NextComponentType<NextPageContext> & { stack?: boolean }
type StackItem = AppInitialProps & { routerProxy: NextRouter; Component: PageComponent }

type Stack = StackItem[]

type StackItemContext = { routerProxy: NextRouter; level: number }
const context = createContext<StackItemContext>(undefined)

export function useStackLevel() {
  return useContext(context).level
}

export function useStackRouter() {
  return useContext(context).routerProxy
}

function StackComponent(props: StackItem & { idx: number; stackIdx: number }) {
  const { Component, pageProps, routerProxy, stackIdx, idx } = props
  return (
    <context.Provider value={{ routerProxy, level: stackIdx - idx }}>
      <Component {...pageProps} />
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

export default function StackedNavigation(
  props: AppPropsType<Router> & { Component: PageComponent },
) {
  const { router, Component, pageProps } = props
  const stack = useRef<Stack>([])
  const idx = Number(global.window?.history.state?.idx ?? 0)

  stack.current = stack.current.slice(0, idx)
  stack.current.push({ Component, pageProps, routerProxy: createRouterProxy(router) })

  let renderStack = stack.current

  const plainIdx = stack.current.reduce(
    (acc, item, i) => (item.Component.stack !== true ? i : acc),
    -1,
  )
  if (plainIdx) renderStack = renderStack.slice(plainIdx)

  return (
    <AnimatePresence initial={false}>
      {renderStack.map((stackItem, stackIdx) => {
        const key = stackItem.routerProxy.asPath
        return <StackComponent key={key} {...stackItem} stackIdx={stackIdx} idx={idx} />
      })}
    </AnimatePresence>
  )
}
