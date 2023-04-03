import { dvh, useMeasureDynamicViewportSize } from '@graphcommerce/framer-utils'
import { AnimatePresence, m } from 'framer-motion'
import { requestIdleCallback, cancelIdleCallback } from 'next/dist/client/request-idle-callback'
import { PrivateRouteInfo } from 'next/dist/shared/lib/router/router'
import { AppPropsType } from 'next/dist/shared/lib/utils'
import { NextRouter, Router } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { pageContext } from '../context/pageContext'
import type { PageComponent, PageItem, UpPage } from '../types'
import { Page } from './Page'
import { PageRenderer } from './PageRenderer'

function findPlainIdx(items: PageItem[]) {
  return items.reduce((acc, item, i) => (typeof item.overlayGroup === 'string' ? acc : i), -1)
}

export type PagesProps = Omit<AppPropsType<NextRouter>, 'pageProps' | 'Component'> & {
  Component: PageComponent
  pageProps?: { up?: UpPage | null }

  /** Fallback URL that is loaded when there is no page available behind the current overlay */
  fallback?: `/${string}`

  /** The path to the route-file */
  fallbackRoute?: `/${string}`
}

function getPageInfo(router: NextRouter) {
  const { asPath, pathname, query, locale } = router
  return { asPath, pathname, query, locale }
}

// function useEarlyRerender() {
//   const router = useRouter()
//   const [url, set] = useState<string>()

//   useEffect(() => {
//     router.events.on('routeChangeStart', set)
//     return () => router.events.off('routeChangeStart', set)
//   }, [router.events])

//   return url
// }

export function FramerNextPages(props: PagesProps) {
  const { router, Component, pageProps: incomingProps, fallback = '/', fallbackRoute = '/' } = props

  // @ts-expect-error Key of the route is still private, should be fixed in https://github.com/vercel/next.js/pull/37192
  // eslint-disable-next-line no-underscore-dangle
  const key = router._key as string

  useMeasureDynamicViewportSize()
  const items = useRef<PageItem[]>([])

  const routerKeys = items.current.map((item) => item.routerKey)
  if (routerKeys.indexOf(key) === -1) routerKeys.push(key)
  const idx = routerKeys.indexOf(key)

  const prevHistory = useRef<number>(-1)
  const direction = idx >= prevHistory.current ? 1 : -1

  prevHistory.current = idx

  const [fb, setFallback] = useState<PageItem>()

  /** We never need to render anything beyong the current idx and we can safely omit everything */
  items.current = items.current.slice(0, idx + 1)

  let activeItem: PageItem = items.current[idx]

  const currentItem = items.current[idx]

  const mustRerender = () => {
    const differentRouter =
      JSON.stringify(currentItem?.routerContext.pageInfo) !== JSON.stringify(getPageInfo(router))
    const differentProps = JSON.stringify(incomingProps) !== JSON.stringify(currentItem?.pageProps)
    return differentRouter || differentProps
  }

  if (!activeItem || mustRerender()) {
    const pageInfo = getPageInfo(router)

    activeItem = {
      PageComponent: Component,
      layoutProps: { ...Component.pageOptions?.layoutProps, ...incomingProps },
      pageProps: incomingProps,
      sharedKey:
        Component.pageOptions?.sharedKey?.(pageInfo) ??
        Component.pageOptions?.overlayGroup ??
        'shared',
      overlayGroup: Component.pageOptions?.overlayGroup,
      historyIdx: idx,
      routerKey: key,
      routerContext: {
        pageInfo,
        prevPage: items.current[idx - 1]?.routerContext,
        prevUp: items.current[idx - 1]?.routerContext.up,
        up: Component.pageOptions?.up ?? incomingProps?.up ?? undefined,
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
        // todo: implement fallback loading for up property
        // const up = items.current[0].PageComponent.pageOptions?.up?.href ?? '/'
        const up = '/'
        const info = await (router as Router).getRouteInfo({
          route: fallbackRoute,
          pathname: fallback,
          query: {},
          as: fallback,
          resolvedAs: fallback,
          routeProps: { shallow: false },
          locale: router.locale,
          hasMiddleware: false,
          isPreview: false,
        })

        const isPrivateRouteInfo = (
          infoResult: Awaited<ReturnType<Router['getRouteInfo']>>,
        ): infoResult is PrivateRouteInfo => 'Component' in infoResult

        if (!isPrivateRouteInfo(info)) return

        const pageInfo = { asPath: up, pathname: up, locale: router.locale, query: {} }
        const Fallback = info.Component as PageComponent
        const fbItem: PageItem = {
          PageComponent: Fallback,
          layoutProps: { ...Fallback.pageOptions?.layoutProps, ...info.props?.pageProps },
          pageProps: info.props?.pageProps,
          sharedKey:
            Fallback.pageOptions?.sharedKey?.(pageInfo) ??
            Fallback.pageOptions?.overlayGroup ??
            'shared',
          overlayGroup: Fallback.pageOptions?.overlayGroup,
          historyIdx: -1,
          routerKey: 'fallback',
          routerContext: {
            pageInfo,
            up: Fallback.pageOptions?.up ?? info.props?.pageProps?.up,
          },
        }

        cancel = requestIdleCallback(() => setFallback(fbItem))
      } catch (e) {
        if (process.env.NODE_ENV !== 'production') {
          // eslint-disable-next-line no-console
          console.log(
            `%cTurn on "Preseve log on navigation" to see the error`,
            'color: blue; font-family:sans-serif; font-size: 20px',
          )

          console.error(
            `@graphcommerce/framer-next-pages encountered loading the fallback.
This happens because the currently configured fallback '${fallback}'
or fallbackRoute '${fallbackRoute}' isn't correct.

Please make sure the fallbackRoute matches the filename of the index page you want to load. e.g. '/[...url]'
and pass it as a param in <FramerNextPages fallbackRoute='/[...url]' /> in your _app.tsx file.
`,
          )
        }
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    loadFallback()

    return () => {
      if (cancel) cancelIdleCallback(cancel)
    }
  }, [shouldLoadFb, router, fallbackRoute, fallback])

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
    <>
      <m.div style={{ position: 'absolute', top: 0, minHeight: dvh(100), left: 0, right: 0 }} />
      <AnimatePresence>
        {renderItems.map((item, itemIdx) => {
          const { historyIdx, sharedKey, overlayGroup, routerKey } = item
          const active = itemIdx === renderItems.length - 1
          const depth = itemIdx - (renderItems.length - 1)
          const closeIdx = renderItems[itemIdx - 1]?.historyIdx ?? -1
          const closeSteps = closeIdx > -1 ? historyIdx - closeIdx : 0
          const backSteps = historyIdx - closeIdx - 1

          return (
            <pageContext.Provider
              key={sharedKey}
              // We're actually rerendering here but since the actual page renderer is memoized we can safely do this
              // eslint-disable-next-line react/jsx-no-constructed-context-values
              value={{ depth, active, direction, closeSteps, backSteps, routerKey, overlayGroup }}
            >
              <Page active={active} routerKey={routerKey}>
                <PageRenderer {...item} />
              </Page>
            </pageContext.Provider>
          )
        })}
      </AnimatePresence>
    </>
  )
}
