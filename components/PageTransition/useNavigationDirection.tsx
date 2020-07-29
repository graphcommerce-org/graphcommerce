import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function useNavigationDirection() {
  const router = useRouter()
  const [navigationState, setNavigationState] = useState<string[]>([router.asPath])
  const [direction, setDirection] = useState<1 | 0 | -1>(0)

  useEffect(() => {
    function history(url: string) {
      // Navigated to previous page
      if (navigationState[navigationState.length - 2] === url) {
        setNavigationState(navigationState.slice(0, -1))
        if (direction !== -1) setDirection(-1)
      }
      // Navigated to same page, do nothing
      else if (navigationState[navigationState.length - 1] === url) {
        if (direction !== 0) setDirection(0)
      }
      // Navigated to next page
      else {
        setNavigationState([...navigationState, url])
        if (direction !== 1) setDirection(1)
      }
    }

    function reset() {
      if (direction !== 0) setDirection(0)
    }

    router.events.on('routeChangeStart', history)
    router.events.on('routeChangeComplete', reset)
    router.events.on('routeChangeError', reset)
    return () => {
      router.events.off('routeChangeStart', history)
      router.events.on('routeChangeComplete', reset)
      router.events.on('routeChangeError', reset)
    }
  }, [direction, navigationState, router])

  return direction
}
