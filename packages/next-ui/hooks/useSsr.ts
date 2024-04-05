import { useSyncExternalStore } from 'react'

const emptySubscribe = () => () => {}

export function useIsSSR() {
  return useSyncExternalStore(
    emptySubscribe,
    () => false,
    () => true,
  )
}
