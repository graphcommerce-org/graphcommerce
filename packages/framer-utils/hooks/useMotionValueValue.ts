import { MotionValue } from 'framer-motion'
import { startTransition, useState } from 'react'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

/** Get the MotionValue's value and return the value as a state update. */
export function useMotionValueValue<T, R>(motionValue: MotionValue<T>, effect: (v: T) => R) {
  const [result, setResult] = useState<R>(effect(motionValue.get()))

  useIsomorphicLayoutEffect(() => {
    const set = (v: T) => startTransition(() => setResult(effect(v)))
    setResult(effect(motionValue.get()))
    return motionValue.on('change', set)
    // we're not recalculating
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [motionValue])

  return result
}
