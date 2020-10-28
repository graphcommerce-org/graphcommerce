import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

export type NavigationSwipe = -1 | 0 | 1

/**
 * Detect if iOS user is swiping to a page from the edge of the screen to navigate back or forward.
 */
export default function useNavigationSwipe() {
  const router = useRouter()
  const [touchStart, setTouchStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [navigationSwipe, setNavigationSwipe] = useState<NavigationSwipe>(0)

  useEffect(() => {
    function handleTouchStart(evt: TouchEvent) {
      const x = evt.touches[0].clientX
      const y = evt.touches[0].clientY

      // Start tracking touch position when we are at one of the edges
      if (x < 10 || x + 10 > document.documentElement.clientWidth) setTouchStart({ x, y })
    }

    function handleTouchMove(event: TouchEvent) {
      if (touchStart.x === 0 && touchStart.y === 0) return

      const xDiff = touchStart.x - event.touches[0].clientX
      const yDiff = touchStart.y - event.touches[0].clientY
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        /* most significant*/
        if (xDiff >= 0) {
          if (navigationSwipe !== 1) setNavigationSwipe(1)
          setTouchStart({ x: 0, y: 0 })
        } else {
          if (navigationSwipe !== -1) setNavigationSwipe(-1)
          setTouchStart({ x: 0, y: 0 })
        }
      }
    }

    /**
     * Once we're done with the page transition, reset everything
     */
    function routeChangeComplete() {
      if (navigationSwipe !== 0) setNavigationSwipe(0)
      if (touchStart.x !== 0 || touchStart.y !== 0) setTouchStart({ x: 0, y: 0 })
    }

    document.addEventListener('touchstart', handleTouchStart)
    document.addEventListener('touchmove', handleTouchMove)
    router.events.on('routeChangeComplete', routeChangeComplete)

    return () => {
      document.removeEventListener('touchstart', handleTouchStart)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', routeChangeComplete)
      router.events.off('routeChangeComplete', routeChangeComplete)
    }
  })

  return navigationSwipe
}
