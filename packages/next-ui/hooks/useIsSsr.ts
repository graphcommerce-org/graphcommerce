import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

/**
 * This method will return true on the server and during hydration and false after that.
 */
export function useIsSSR() {
  return useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true,
  )
}
