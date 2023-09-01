import { useEffect } from 'react'

export function usePreventScroll(shouldPrevent: boolean) {
  useEffect(() => {
    const preventScrolling = (e) => e.preventDefault()

    if (shouldPrevent) {
      // When the effect runs, add the event listeners.
      window.addEventListener('wheel', preventScrolling, { passive: false })
      window.addEventListener('touchmove', preventScrolling, { passive: false })
    }

    return () => {
      // When the effect is cleaned up, remove the event listeners.
      window.removeEventListener('wheel', preventScrolling)
      window.removeEventListener('touchmove', preventScrolling)
    }
  }, [shouldPrevent]) // The effect will re-run whenever `shouldPrevent` changes.
}
