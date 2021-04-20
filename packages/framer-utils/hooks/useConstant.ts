import { useRef } from 'react'

export function useConstant<T>(init: () => T) {
  const ref = useRef<T | null>(null)
  if (ref.current === null) ref.current = init()
  return ref.current
}
