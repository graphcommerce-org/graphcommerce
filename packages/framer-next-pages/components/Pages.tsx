import { AnimatePresence } from 'framer-motion'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import { NextRouter } from 'next/router'
import React, { useRef } from 'react'
import { pageContext } from '../context/pageContext'
import { createRouterProxy, pageRouterContext } from '../context/pageRouterContext'
import type { PageComponent, PageItem, UpPage } from '../types'
import Page from './Page'

function findPlainIdx(items: PageItem[]) {
  return items.reduce((acc, item, i) => (typeof item.overlayGroup === 'string' ? acc : i), -1)
}

type PagesProps = Omit<AppPropsType<NextRouter>, 'pageProps'> & {
  Component: PageComponent
  fallback?: React.ReactNode
  fallbackKey?: string
  pageProps?: { up?: UpPage }
}

const NoopLayout: React.FC = ({ children }) => <>{children}</>

export default function FramerNextPages(props: PagesProps) {
  const { router, Component, pageProps, fallback, fallbackKey } = props

  const items = useRef<PageItem[]>([])
  const idx = Number(global.window?.history.state?.idx ?? 0)
  const prevHistory = useRef<number>(-1)
  const direction = idx > prevHistory.current ? 1 : -1
  prevHistory.current = idx

  /** We never need to render anything beyong the current idx and we can safely omit everything */
  items.current = items.current.slice(0, idx + 1)

  let activeItem: PageItem = items.current[idx]

  const mustRerender = () =>
    JSON.stringify(pageProps) !== JSON.stringify(items.current[idx]?.sharedPageProps)

  if (!activeItem || mustRerender()) {
    const proxy = createRouterProxy(router)

    activeItem = {
      children: <Component {...(pageProps as Record<string, unknown>)} />,
      currentRouter: proxy,
      SharedComponent: Component.pageOptions?.SharedComponent,
      sharedProps: Component.pageOptions?.sharedProps,
      sharedPageProps: pageProps,
      sharedKey: Component.pageOptions?.sharedKey?.(proxy) ?? proxy.pathname,
      overlayGroup: Component.pageOptions?.overlayGroup,
      historyIdx: idx,
      up: Component.pageOptions?.up ?? pageProps?.up,
    }
    items.current[idx] = activeItem
  }

  let renderItems = [...items.current]

  /** We need to render back to the last item that isn't an overlay. */
  const plainIdx = findPlainIdx(items.current)

  /** If we don't have a plain component we add a fallback to the beginning of an item */
  if (plainIdx === -1 && fallback) {
    if (!fallbackKey) {
      throw Error('When defining a fallback you should also provide a fallbackKey')
    }
    const fbItem: PageItem = {
      children: fallback,
      currentRouter: createRouterProxy(router),
      sharedKey: fallbackKey,
      historyIdx: -1,
    }

    renderItems = [fbItem, ...renderItems]
  }

  if (plainIdx > -1) renderItems = items.current.slice(plainIdx)

  if (process.env.NODE_ENV !== 'production' && items.current.findIndex((i) => !i) > -1) {
    console.warn(
      'FramerNextPages was remounted, make sure it never remounts while the app is running.',
    )
  }

  /**
   * Cleanup the `renderItems`:
   *
   * - A key can only occur once in AnimatePresence, therefore we remove duplicates and maintain the
   *   last one as that one has the most recent props.
   * - We remove all overlays that aren't of the same overlay type
   */
  const seen = new Set<string>()
  renderItems = renderItems
    .reverse()
    .filter((item) => {
      if (!item || seen.has(item.sharedKey)) return false
      seen.add(item.sharedKey)

      if (
        typeof activeItem.overlayGroup === 'string' &&
        typeof item.overlayGroup === 'string' &&
        activeItem.overlayGroup !== item.overlayGroup
      ) {
        return false
      }
      return true
    })
    .reverse()

  return (
    <AnimatePresence initial={false}>
      {renderItems.map((item, itemIdx) => {
        const {
          children,
          historyIdx,
          sharedKey,
          SharedComponent = NoopLayout,
          sharedProps,
          sharedPageProps,
          currentRouter,
          up,
        } = item
        const active = itemIdx === renderItems.length - 1
        const depth = itemIdx - (renderItems.length - 1)
        const closeIdx = renderItems[itemIdx - 1]?.historyIdx ?? -1
        const closeSteps = closeIdx > -1 ? historyIdx - closeIdx : 0

        const backSteps = historyIdx - closeIdx - 1

        const { currentRouter: prevRouter, up: prevUp } = items.current[historyIdx - 1] ?? {}

        return (
          <pageContext.Provider
            key={sharedKey}
            value={{
              depth,
              active,
              direction,
              closeSteps,
              backSteps,
            }}
          >
            <Page active={active} historyIdx={historyIdx}>
              <pageRouterContext.Provider value={{ currentRouter, prevRouter, up, prevUp }}>
                <SharedComponent {...sharedPageProps} {...sharedProps}>
                  {children}
                </SharedComponent>
              </pageRouterContext.Provider>
            </Page>
          </pageContext.Provider>
        )
      })}
    </AnimatePresence>
  )
}
