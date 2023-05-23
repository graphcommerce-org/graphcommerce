import { cache } from 'react'

export const serverOnlyContext = <T>(
  defaultValue: T,
): {
  get: () => T
  set: (v: T) => void
} => {
  const ref = cache(() => ({ current: defaultValue }))

  const get = (): T => ref().current
  const set = (value: T) => {
    ref().current = value
  }

  return { get, set }
}
