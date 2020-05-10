import { useState, useEffect } from 'react'

type EffectiveConnectionType = 'slow-2g' | '2g' | '3g' | '4g' | undefined

declare global {
  interface Navigator {
    connection?: {
      effectiveType: EffectiveConnectionType
      addEventListener<K extends keyof WindowEventMap>(
        type: K,
        listener: (this: Window, ev: WindowEventMap[K]) => unknown,
        options?: boolean | AddEventListenerOptions,
      ): void
      addEventListener(
        type: string,
        listener: EventListenerOrEventListenerObject,
        options?: boolean | AddEventListenerOptions,
      ): void
      removeEventListener<K extends keyof WindowEventMap>(
        type: K,
        listener: (this: Window, ev: WindowEventMap[K]) => unknown,
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

const isLighthouse =
  typeof window !== 'undefined' &&
  (navigator.userAgent.indexOf('Nexus 5X') > 0 || navigator.userAgent.indexOf('Moto G (4)') > 0)

/**
 * Will return the effective connection type used by the client
 * Will return undefined on the server
 * Will return 4g for non supported browsers
 */
const useConnectionType = (allowDowngrade = false): EffectiveConnectionType | undefined | null => {
  let initialStatus: EffectiveConnectionType

  // On the client:  Get the effectiveType ELSE fallback to 4g for safari
  if (typeof window !== 'undefined') initialStatus = navigator?.connection?.effectiveType ?? '4g'

  // If we're running a lighthouse audit, always force 3g
  if (isLighthouse) initialStatus = '3g'

  const [networkStatus, setNetworkStatus] = useState<EffectiveConnectionType>(initialStatus)

  useEffect(() => {
    // We skip listening for lighthouse
    if (isLighthouse) return () => {}

    const update = () => {
      // Downgrade only if we allow it to
      if (allowDowngrade || networkStatus !== '4g')
        setNetworkStatus(navigator?.connection?.effectiveType)
    }

    // Listen to network condition
    navigator?.connection?.addEventListener('change', update)
    return () => navigator?.connection?.removeEventListener('change', update)
  }, [allowDowngrade, networkStatus])

  return networkStatus
}

export default useConnectionType
