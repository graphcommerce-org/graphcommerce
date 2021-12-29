import { AnimatePresence } from 'framer-motion'
import { requestIdleCallback, cancelIdleCallback } from 'next/dist/client/request-idle-callback'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import type { NextRouter, Router } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import {} from 'react-dom'
import { pageContext } from '../context/pageContext'
import type { PageComponent, PageItem, UpPage } from '../types'
import { createRouterProxy } from '../utils/createRouterProxy'
import Page from './Page'
import { PageRenderer } from './PageRenderer'

function findPlainIdx(items: PageItem[]) {
  return items.reduce((acc, item, i) => (typeof item.overlayGroup === 'string' ? acc : i), -1)
}

type PagesProps = Omit<AppPropsType<NextRouter>, 'pageProps' | 'Component'> & {
  Component: PageComponent
  pageProps?: { up?: UpPage | null }
}

export default function FramerNextPages(props: PagesProps) {
  const { router, Component, pageProps } = props

  const items = useRef<PageItem[]>([])
  const idx = Number(global.window?.history.state?.idx ?? 0)
  const prevHistory = useRef<number>(-1)
  const [fb, setFallback] = useState<PageItem>()
  const direction = idx > prevHistory.current ? 1 : -1
  prevHistory.current = idx

  /** We never need to render anything beyong the current idx and we can safely omit everything */
  items.current = items.current.slice(0, idx + 1)

  let activeItem: PageItem = items.current[idx]

  const mustRerender = () =>
    JSON.stringify(pageProps) !== JSON.stringify(items.current[idx]?.actualPageProps)

  if (!activeItem || mustRerender()) {
    const proxy = createRouterProxy(router)

    activeItem = {
      PageComponent: Component,
      Layout: Component.pageOptions?.Layout,
      layoutProps: { ...Component.pageOptions?.layoutProps, ...pageProps },
      actualPageProps: pageProps,
      sharedKey: Component.pageOptions?.sharedKey?.(proxy) ?? proxy.pathname,
      overlayGroup: Component.pageOptions?.overlayGroup,
      historyIdx: idx,
      routerContext: {
        currentRouter: proxy,
        prevRouter: items.current[idx - 1]?.routerContext.currentRouter,
        prevUp: items.current[idx - 1]?.routerContext.up,
        up: Component.pageOptions?.up ?? pageProps?.up ?? undefined,
      },
    }
    items.current[idx] = activeItem
  }

  let renderItems = [...items.current]

  /** We need to render back to the last item that isn't an overlay. */
  const plainIdx = findPlainIdx(items.current)

  const shouldLoadFb = plainIdx === -1 && typeof window !== 'undefined' && !fb

  useEffect(() => {
    if (!shouldLoadFb) return () => {}

    let cancel: number
    async function loadFallback() {
      try {
        const info = await (router as Router).getRouteInfo('/', '/', {}, '/', '/', {
          shallow: false,
        })
        const proxy = createRouterProxy(router, { asPath: '/', pathname: '/', query: {} })
        const Fallback = info.Component as PageComponent
        const fbItem: PageItem = {
          PageComponent: Fallback,
          Layout: Fallback.pageOptions?.Layout,
          layoutProps: { ...Fallback.pageOptions?.layoutProps, ...info.props?.pageProps },
          actualPageProps: info.props?.pageProps,
          sharedKey: Fallback.pageOptions?.sharedKey?.(proxy) ?? proxy.pathname,
          overlayGroup: Fallback.pageOptions?.overlayGroup,
          historyIdx: -1,
          routerContext: {
            currentRouter: proxy,
            up: Fallback.pageOptions?.up ?? info.props?.pageProps?.up,
          },
        }

        cancel = requestIdleCallback(() => setFallback(fbItem))
      } catch (e) {
        // Loading failed, we do nothing.
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadFallback()

    return () => {
      if (cancel) cancelIdleCallback(cancel)
    }
  }, [shouldLoadFb, router])

  // Add the fallback if it is available
  if (fb && plainIdx === -1) renderItems = [fb, ...renderItems]

  if (plainIdx > -1) renderItems = items.current.slice(plainIdx)

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

      return !(
        typeof activeItem.overlayGroup === 'string' &&
        typeof item.overlayGroup === 'string' &&
        activeItem.overlayGroup !== item.overlayGroup
      )
    })
    .reverse()

  return (
    <AnimatePresence initial={false}>
      {renderItems.map((item, itemIdx) => {
        const { historyIdx, sharedKey, overlayGroup } = item
        const active = itemIdx === renderItems.length - 1
        const depth = itemIdx - (renderItems.length - 1)
        const closeIdx = renderItems[itemIdx - 1]?.historyIdx ?? -1
        const closeSteps = closeIdx > -1 ? historyIdx - closeIdx : 0
        const backSteps = historyIdx - closeIdx - 1

        return (
          <pageContext.Provider
            key={sharedKey}
            // We're actually rerendering here but since the PageRenderer is memoized we can safely do this
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{ depth, active, direction, closeSteps, backSteps, historyIdx, overlayGroup }}
          >
            <Page active={active} historyIdx={historyIdx}>
              <PageRenderer {...item} />
            </Page>
          </pageContext.Provider>
        )
      })}
    </AnimatePresence>
  )
}
