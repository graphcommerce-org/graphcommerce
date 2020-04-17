import { useState, useEffect } from 'react'

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
    // @ts-ignore
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
    if (!unsupported) {
      // @ts-ignore
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
    }
  }, [])

  return { ...networkStatus }
}

export default useNetworkStatus
