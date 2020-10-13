import { useQuery } from '@apollo/client'
import { HistoryStateDocument } from 'generated/documents'
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'
import {
  updatePage,
  getPage,
  updateHistory,
  getPrevIdx,
  getNextIdx,
  getFromPage,
  addPage,
} from './historyHelpers'
import resolveHref from './resolveHref'
import { historyStateVar } from './typePolicies'

// How should we handle a navigation swipe back / forward?
export default function useHistoryState() {
  const router = useRouter()
  const { data } = useQuery(HistoryStateDocument)

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    // todo: add unload event to restore the scroll restoration?
  }, [router.asPath])

  if (data?.historyState.pages.length === 0) {
    updatePage({}, { as: Router.asPath, href: Router.route, x: 0, y: 0, holdPrevious: true }, 0)
  }

  // Watch all route changes so we can track forward/backward navigation
  useEffect(() => {
    const routeChangeStart = async (as: string) => {
      // Navigated to same page
      if (getPage()?.as === as) return

      // Navigated to previous page
      const prevIdx = getPrevIdx()
      if (getPage(prevIdx)?.as === as) {
        updateHistory({ direction: 'BACK', phase: 'LOADING', idx: prevIdx })
        return
      }

      const href = (await resolveHref(as)).pathname
      const idx = getNextIdx()
      const nextPage = getPage(idx)
      const state = { direction: 'FORWARD', phase: 'LOADING', idx } as const
      if (nextPage && nextPage.as === as) {
        updatePage(state, { as, href, holdPrevious: true }, idx)
      } else {
        addPage(state, { as, href, holdPrevious: true, x: 0, y: 0 }, idx)
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.events.on('routeChangeStart', routeChangeStart)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return () => router.events.off('routeChangeStart', routeChangeStart)
  }, [router.events])

  useEffect(() => {
    const beforeHistoryChange = () => updateHistory({ phase: 'LOCATION_CHANGED' })
    router.events.on('beforeHistoryChange', beforeHistoryChange)
    return () => router.events.off('beforeHistoryChange', beforeHistoryChange)
  }, [router.events])

  // Track when an error happenss
  useEffect(() => {
    function routeChangeError(error: Error) {
      console.error('error while changing route', error)
    }
    router.events.on('routeChangeError', routeChangeError)
    return () => router.events.off('routeChangeError', routeChangeError)
  }, [router.events])

  useEffect(() => {
    const routeChangeComplete = () => {
      const fromPage = getFromPage()
      const page = getPage()
      const skipScroll = page?.y === fromPage?.y && page?.x === fromPage?.x
      if (skipScroll) {
        updateHistory({ phase: 'SCROLLED' })
      } else {
        updateHistory({ phase: 'SCROLLING' })
        window.scrollTo(page?.x ?? 0, page?.y ?? 0)
        updateHistory({ phase: 'SCROLLED' })
      }
    }
    router.events.on('routeChangeComplete', routeChangeComplete)
    return () => router.events.off('routeChangeComplete', routeChangeComplete)
  })

  // When the location has changed, change the scroll position
  useEffect(() => {
    if (data?.historyState.phase === 'SCROLLED') updateHistory({ phase: 'FINISHED' })
  }, [data?.historyState.phase])

  useEffect(() => {
    const onScroll = () => {
      if (historyStateVar().phase === 'SCROLLING') updateHistory({ phase: 'SCROLLED' })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  })
}
