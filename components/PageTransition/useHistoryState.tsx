import { useQuery } from '@apollo/client'
import { HistoryStateDocument } from 'generated/documents'
import Router, { useRouter } from 'next/router'
import { useEffect } from 'react'
import { updatePage, getPage, updateHistory, getPrevIdx, getNextIdx } from './historyState'
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
    historyStateVar({
      ...data.historyState,
      pages: [{ as: Router.asPath, href: Router.route, x: 0, y: 0, holdPrevious: true }],
    })
  }

  // Watch all route changes so we can track forward/backward navigation
  useEffect(() => {
    const routeChangeStart = async (newUrl: string) => {
      // Navigated to same page
      if (getPage()?.as === newUrl) return

      // Navigated to previous page
      const prevIdx = getPrevIdx()
      if (getPage(prevIdx)?.as === newUrl) {
        updateHistory({ idx: prevIdx, direction: 'BACK', phase: 'LOADING' })
        return
      }

      const href = (await resolveHref(newUrl)).pathname
      const nextIdx = getNextIdx()
      updatePage(
        { direction: 'FORWARD', phase: 'LOADING', idx: nextIdx },
        { as: newUrl, href, holdPrevious: true },
        nextIdx,
      )
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

  // When the location has changed, change the scroll position
  useEffect(() => {
    if (data?.historyState.phase === 'SCROLL_SAVED') {
      updateHistory({ phase: 'BEFORE_SCROLL' })
      const page = getPage()
      window.scrollTo(page?.x ?? 0, page?.y ?? 0)
    }

    if (data?.historyState.phase === 'BEFORE_SCROLL') {
      updateHistory({ phase: 'FINISHED' })
    }
  }, [data?.historyState.phase])
}
