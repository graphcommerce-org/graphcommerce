// eslint-disable-next-line import/no-extraneous-dependencies
import { equal } from '@wry/equality'
import { useRef } from 'react'

/** Always returns the same object if it structurally the same. */
export function useMemoObject<T>(obj: T): T {
  const ref = useRef<T>(obj)
  if (!equal(obj, ref.current)) {
    ref.current = obj
  }
  return ref.current
}
