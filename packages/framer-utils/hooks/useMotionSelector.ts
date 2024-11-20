import type { MotionValue } from 'framer-motion'
import { startTransition, useState } from 'react'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

type UnwrapMotionValue<T> = T extends MotionValue<infer U> ? U : T
type UnwrapMotionValues<T extends [...any[]]> = T extends [infer Head, ...infer Tail]
  ? [UnwrapMotionValue<Head>, ...UnwrapMotionValues<Tail>]
  : []

export function useMotionSelector<T extends [...any[]], R>(
  motionValues: readonly [...T],
  effect: (v: UnwrapMotionValues<T>) => R,
) {
  const calcEffect = () => effect(motionValues.map((v) => v.get()) as UnwrapMotionValues<T>)
  const [result, setResult] = useState<R>(calcEffect)

  useIsomorphicLayoutEffect(() => {
    const set = () => startTransition(() => setResult(calcEffect))
    setResult(calcEffect)

    const unsubscribers = motionValues.map((motionValue) => motionValue.on('change', set))
    return () => unsubscribers.forEach((unsubscribe) => unsubscribe())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motionValues])

  return result
}
