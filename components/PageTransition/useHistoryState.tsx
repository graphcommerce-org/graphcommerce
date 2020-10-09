import { useQuery } from '@apollo/client'
import { HistoryStateDocument } from 'generated/documents'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import resolveHref from './resolveHref'

let cleared = false
export const defaultHistoryState: GQLHistoryStateQuery = {
  historyState: {
    __typename: 'HistoryState',
    direction: 'FORWARD',
    idx: 0,
    pages: [],
    phase: 'LOADING',
  },
}

// How should we handle a navigation swipe back / forward?
export default function useHistoryState() {
  const router = useRouter()
  const { client, data = defaultHistoryState } = useQuery(HistoryStateDocument)
  const { historyState } = data

  // Clear the history on page load
  // Q: Can we retain the history so that the scroll position is maintained on a refresh?
  // A: The history currently is stored in localstorage so it is maintained for weeks, wich cant work.
  // A: A returning visitor might not be going back, they might re-enter the site with a completely new scroll history.
  useEffect(() => {
    if (cleared) return
    client.writeQuery({
      query: HistoryStateDocument,
      data: {
        historyState: {
          ...defaultHistoryState.historyState,
          phase: 'FINISHED',
          pages: [{ href: router.route, as: router.asPath, x: 0, y: 0, holdPrevious: true }],
        },
      },
      broadcast: true,
    })
    cleared = true
  }, [client, router.asPath, router.route])

  useEffect(() => {
    window.history.scrollRestoration = 'manual'
    // todo: add unload event to restore the scroll restoration?
  }, [router.asPath])

  // Watch all route changes so we can track forward/backward navigation
  useEffect(() => {
    const routeChangeStart = async (newUrl: string) => {
      // Navigated to same page
      if (historyState.pages[historyState.idx]?.as === newUrl) {
        return
      }

      // Navigated to previous page
      const prevIdx = historyState.idx - 1
      if (historyState.pages[prevIdx]?.as === newUrl) {
        console.log('min idx')
        client.writeQuery({
          query: HistoryStateDocument,
          data: {
            historyState: { ...historyState, idx: prevIdx, direction: 'BACK', phase: 'LOADING' },
          },
          broadcast: true,
        })
        return
      }

      const href = (await resolveHref(newUrl)).pathname
      const newPage: GQLHistoryStatePage = { as: newUrl, href, x: 0, y: 0, holdPrevious: true }
      const nextIdx = historyState.idx + 1
      const pages = [...historyState.pages]
      pages[nextIdx] = pages[nextIdx]?.as === newUrl ? pages[nextIdx] : newPage

      console.log('plus idx')
      // Navigated to next page
      client.writeQuery({
        query: HistoryStateDocument,
        data: {
          historyState: {
            ...historyState,
            idx: nextIdx,
            direction: 'FORWARD',
            phase: 'LOADING',
            pages,
          },
        },
        broadcast: true,
      })
    }

    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    router.events.on('routeChangeStart', routeChangeStart)
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    return () => router.events.off('routeChangeStart', routeChangeStart)
  }, [client, router.asPath, router.events, historyState])

  useEffect(() => {
    const beforeHistoryChange = () => {
      client.writeQuery({
        query: HistoryStateDocument,
        data: { historyState: { ...historyState, phase: 'LOCATION_CHANGED' } },
        broadcast: true,
      })
    }
    router.events.on('beforeHistoryChange', beforeHistoryChange)
    return () => router.events.off('beforeHistoryChange', beforeHistoryChange)
  }, [client, historyState, router.events])

  // Track when an error happenss
  useEffect(() => {
    function routeChangeError(error: Error) {
      console.error('error while changing route', error)
    }
    router.events.on('routeChangeError', routeChangeError)
    return () => router.events.off('routeChangeError', routeChangeError)
  }, [client, router.events])

  // Track the change when the route change has been completed
  useEffect(() => {
    function routeChangeComplete() {
      console.log('save scroll position', window.scrollX, window.scrollY)
      const oldIdx =
        historyState?.direction === 'FORWARD' ? historyState.idx - 1 : historyState.idx + 1

      const pages = [...historyState.pages]
      pages[oldIdx] = {
        ...historyState.pages[oldIdx],
        x: window.scrollX,
        y: window.scrollY,
      }

      const newHistoryState = { ...historyState, phase: 'BEFORE_SCROLL', pages }

      client.writeQuery({
        query: HistoryStateDocument,
        data: { historyState: newHistoryState },
        broadcast: true,
      })

      requestAnimationFrame(() => {
        console.log('adjust scroll position')
        const page = newHistoryState.pages[historyState.idx]
        window.scrollTo(page.x, page.y)
        client.writeQuery({
          query: HistoryStateDocument,
          data: { historyState: { ...newHistoryState, phase: 'FINISHED' } },
          broadcast: true,
        })
      })
    }

    router.events.on('routeChangeComplete', routeChangeComplete)
    return () => router.events.off('routeChangeComplete', routeChangeComplete)
  }, [client, router.events, historyState])
}
