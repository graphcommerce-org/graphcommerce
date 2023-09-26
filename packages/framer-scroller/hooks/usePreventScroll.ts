import { useEffect } from 'react'

export function usePreventScroll(shouldPrevent: boolean) {
  useEffect(() => {
    const preventScrolling = (e) => e.preventDefault()

    if (shouldPrevent) {
      // Block scrolling event
      window.addEventListener('wheel', preventScrolling, { passive: false })
      window.addEventListener('touchmove', preventScrolling, { passive: false })

      // Hide scrollbar
      const style = document.createElement('style')
      style.innerHTML = `
        body::-webkit-scrollbar {
            width: 0px; 
        }
        background-color: transparent;
      `
      document.head.appendChild(style)
    }

    return () => {
      // When the effect is cleaned up, remove the event listeners.
      window.removeEventListener('wheel', preventScrolling)
      window.removeEventListener('touchmove', preventScrolling)

      const styles = Array.from(document.head.getElementsByTagName('style'))
      styles.forEach((style) => {
        if (style.innerHTML.includes('body::-webkit-scrollbar')) {
          document.head.removeChild(style)
        }
      })
    }
  }, [shouldPrevent])
}
