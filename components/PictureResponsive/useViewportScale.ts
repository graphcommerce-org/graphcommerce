import { useEffect, useRef, useState } from 'react'

interface VisualViewport {
  height: number
  offsetLeft: number
  offsetTop: number
  pageLeft: number
  pageTop: number
  scale: number
  width: number
}

declare global {
  interface Window {
    visualViewport: VisualViewport & {
      addEventListener<K extends keyof WindowEventMap>(
        type: K,
        listener: (this: Window, ev: WindowEventMap[K]) => any,
        options?: boolean | AddEventListenerOptions,
      ): void
      addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions,
      ): void
      removeEventListener<K extends keyof WindowEventMap>(
        type: K,
        listener: (this: Window, ev: WindowEventMap[K]) => any,
        options?: boolean | EventListenerOptions,
      ): void
      removeEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | EventListenerOptions,
      ): void
    }
  }
}

export function useViewportScale(): number {
  const hasViewport = typeof window !== 'undefined' && 'visualViewport' in window !== false
  const [scale, setScale] = useState<number>(hasViewport ? window.visualViewport.scale : 1)

  useEffect(() => {
    if (window.visualViewport) setScale(window.visualViewport.scale)
    window.visualViewport.addEventListener('resize', () => {
      setScale(window.visualViewport.scale)
    })
  })

  return scale
}
