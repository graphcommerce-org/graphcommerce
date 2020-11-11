import { delLocale } from 'next/dist/next-server/lib/router/router'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { updatePage, getPage, updateHistory, addPage } from './historyHelpers'
import resolveHref from './resolveHref'
import { historyStateVar } from './typePolicies'

// todo: How should we handle a navigation swipe back / forward?
export default function useHistoryState() {
  const router = useRouter()

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    window.addEventListener('unload', () => {
      window.history.scrollRestoration = 'auto'
    })
  }, [])

  // Resets the historyStateVar when a wrong state has been found.
  // todo: check if we can find a page that we can set the idx to?
  if (historyStateVar().pages[historyStateVar().idx]?.as !== router.asPath) {
    historyStateVar.reset()
  }

  if (historyStateVar().pages.length === 0) {
    addPage({}, { as: router.asPath, href: router.route }, 0)
  }

  // Watch all route changes so we can track forward/backward navigation
  useEffect(() => {
    const routeChangeStart = async (asFull: string) => {
      const as = delLocale(asFull, router.locale)

      // Navigated to same page
      if (getPage()?.as === as) return

      // Navigated to previous page
      const prevIdx = historyStateVar().idx - 1
      if (getPage(prevIdx)?.as === as) {
        updateHistory({ direction: 'BACK', phase: 'LOADING', idx: prevIdx })
        return
      }

      const href = (await resolveHref(as)).pathname
      const idx = historyStateVar().idx + 1
      const nextPage = getPage(idx)
      const state = { direction: 'FORWARD', phase: 'LOADING', idx } as const
      if (nextPage && nextPage.as === as) {
        updatePage(state, { as, href }, idx)
      } else {
        addPage(state, { as, href }, idx)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.events.on('routeChangeStart', routeChangeStart)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return () => router.events.off('routeChangeStart', routeChangeStart)
  }, [router.events, router.locale])

  useEffect(() => {
    const beforeHistoryChange = () => updateHistory({ phase: 'LOCATION_CHANGED' })
    router.events.on('beforeHistoryChange', beforeHistoryChange)
    return () => router.events.off('beforeHistoryChange', beforeHistoryChange)
  }, [router.events])

  useEffect(() => {
    const routeChangeComplete = () => {
      const page = getPage()
      document.body.style.minHeight = `calc(100vh + ${page?.y}px)`
      window.scrollTo(page?.x ?? 0, page?.y ?? 0)
    }
    router.events.on('routeChangeComplete', routeChangeComplete)
    return () => router.events.off('routeChangeComplete', routeChangeComplete)
  })
}
