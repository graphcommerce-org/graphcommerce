import { useState, useEffect } from 'react'

declare global {
  interface Navigator {
    connection: {
      effectiveType: 'slow-2g' | '2g' | '3g' | '4g'
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

/**
 * Copy of https://github.com/GoogleChromeLabs/react-adaptive-hooks/blob/master/network/index.js
 * Added typescript support
 */
type EffectiveConnectionType = Window['navigator']['connection']['effectiveType']

let unsupported: boolean

const useNetworkStatus = (
  initialEffectiveConnectionType: EffectiveConnectionType | null,
): {
  unsupported: boolean
  connectionType: EffectiveConnectionType | null
} => {
  if (
    typeof navigator !== 'undefined' &&
    'connection' in navigator &&
    'effectiveType' in navigator.connection
  ) {
    unsupported = false
  } else {
    unsupported = true
  }

  const initialNetworkStatus = {
    unsupported,
    connectionType: unsupported
      ? initialEffectiveConnectionType
      : navigator.connection.effectiveType,
  }

  const [networkStatus, setNetworkStatus] = useState(initialNetworkStatus)

  useEffect(() => {
    if (unsupported) return () => {}

    const navigatorConnection = navigator.connection
    const updateECTStatus = () => {
      setNetworkStatus({
        unsupported,
        connectionType: navigatorConnection.effectiveType,
      })
    }
    navigatorConnection.addEventListener('change', updateECTStatus)
    return () => {
      navigatorConnection.removeEventListener('change', updateECTStatus)
    }
  }, [])

  return { ...networkStatus }
}

export default useNetworkStatus
