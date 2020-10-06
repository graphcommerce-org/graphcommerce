import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export type NavigationDirection = -1 | 0 | 1

const item =
  typeof window !== 'undefined' ? window.sessionStorage.getItem(`__historyState`) : undefined
let historyState: string[] = item ? JSON.parse(item) : []

export default function useNavigationDirection() {
  const router = useRouter()
  const [direction, setDirection] = useState<NavigationDirection>(0)

  useEffect(() => {
    const onRouteChangeStart = (toUrl: string) => {
      // Navigated to previous page
      if (historyState[historyState.length - 2] === toUrl) {
        setDirection(-1)
        return
      }

      // Navigated to next page
      if (historyState[historyState.length - 1] === toUrl) {
        setDirection(0)
        return
      }

      setDirection(1)
    }

    // Navigated to previous page
    if (historyState[historyState.length - 2] === router.asPath) {
      historyState = historyState.slice(0, -1)
    }

    // Navigated to next page
    if (historyState[historyState.length - 1] !== router.asPath) {
      historyState = [...historyState, router.asPath]
    }

    window.sessionStorage.setItem(`__historyState`, JSON.stringify(historyState))
    router.events.on('routeChangeStart', onRouteChangeStart)
    return () => router.events.off('routeChangeStart', onRouteChangeStart)
  }, [router.events, router.asPath])

  return direction
}
