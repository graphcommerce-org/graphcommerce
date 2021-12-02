import { AnimatePresence } from 'framer-motion'
import { PrivateRouteInfo } from 'next/dist/shared/lib/router/router'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import type { NextRouter, Router } from 'next/router'
import React, { useRef, useState } from 'react'
import { pageContext } from '../context/pageContext'
import { createRouterProxy, pageRouterContext } from '../context/pageRouterContext'
import type { PageComponent, PageItem, UpPage } from '../types'
import Page from './Page'

function findPlainIdx(items: PageItem[]) {
  return items.reduce((acc, item, i) => (typeof item.overlayGroup === 'string' ? acc : i), -1)
}

type PagesProps = Omit<AppPropsType<NextRouter>, 'pageProps'> & {
  Component: PageComponent
  pageProps?: { up?: UpPage }
}

// eslint-disable-next-line react/jsx-no-useless-fragment
const NoopLayout: React.FC = ({ children }) => <>{children}</>

export default function FramerNextPages(props: PagesProps) {
  const { router, Component, pageProps } = props

  const items = useRef<PageItem[]>([])
  const idx = Number(global.window?.history.state?.idx ?? 0)
  const prevHistory = useRef<number>(-1)
  const [fb, setFallback] = useState<PrivateRouteInfo | undefined>()
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
      children: <Component {...(pageProps as Record<string, unknown>)} />,
      currentRouter: proxy,
      Layout: Component.pageOptions?.Layout,
      layoutProps: Component.pageOptions?.layoutProps,
      actualPageProps: pageProps,
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
  if (plainIdx === -1 && typeof window !== 'undefined') {
    if (!fb) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      ;(async () => {
        const info = await (router as Router).getRouteInfo('/', '/', {}, '/', '/', {
          shallow: false,
        })
        return setFallback(info)
      })()
    } else {
      const proxy = createRouterProxy(router, { asPath: '/', pathname: '/', query: {} })

      const Fallback = fb.Component as PageComponent

      const fbItem: PageItem = {
        children: <Fallback {...(fb.props?.pageProps as Record<string, unknown>)} />,
        currentRouter: proxy,
        Layout: Fallback.pageOptions?.Layout,
        layoutProps: Fallback.pageOptions?.layoutProps,
        actualPageProps: fb.props?.pageProps,
        sharedKey: Fallback.pageOptions?.sharedKey?.(proxy) ?? proxy.pathname,
        overlayGroup: Fallback.pageOptions?.overlayGroup,
        historyIdx: -1,
        up: Fallback.pageOptions?.up ?? fb.props?.pageProps?.up,
      }
      renderItems = [fbItem, ...renderItems]
    }
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
          Layout = NoopLayout,
          layoutProps,
          actualPageProps,
          currentRouter,
          overlayGroup,
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
            // Since we very carefully prevent rerenders of this component we can safely ignore the eslint error
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{ depth, active, direction, closeSteps, backSteps, historyIdx, overlayGroup }}
          >
            <Page active={active} historyIdx={historyIdx}>
              <pageRouterContext.Provider
                // eslint-disable-next-line react/jsx-no-constructed-context-values
                value={{ currentRouter, prevRouter, up, prevUp }}
              >
                <Layout {...actualPageProps} {...layoutProps}>
                  {children}
                </Layout>
              </pageRouterContext.Provider>
            </Page>
          </pageContext.Provider>
        )
      })}
    </AnimatePresence>
  )
}
