import type { MotionValue } from 'framer-motion'
import sync from 'framesync'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export type UseClientSizeReturn = { x: MotionValue<string>; y: MotionValue<string> }
export type UseClientSizeOptions = { x?: string; y?: string }

export const dvh = (p = 100) => {
  if (p === 100) return 'var(--client-size-y)'
  return `calc(var(--client-size-y) * ${p / 100})`
}
export const dvw = (p = 100) => {
  if (p === 100) return 'var(--client-size-x)'
  return `calc(var(--client-size-x) * ${p / 100})`
}

let watching = false

/**
 * Calculates the dvh and dvw css variables. Method should be deprecated when the real dvh/dvw are
 * widelt available.
 */
export function useMeasureDynamicViewportSize() {
  useIsomorphicLayoutEffect(() => {
    if (watching === true) return () => {}

    const hasSupport = globalThis.CSS?.supports?.('height: 100dvh') ?? false

    if (hasSupport) return () => {}

    const recalc = () => {
      document.body.style.setProperty('--client-size-x', `${global.window?.innerWidth ?? 0}px`)
      document.body.style.setProperty('--client-size-y', `${global.window?.innerHeight ?? 0}px`)
    }
    const recalcSynced = () => sync.read(recalc)

    window.addEventListener('resize', recalcSynced)

    recalcSynced()
    watching = true

    return () => {
      watching = false
      window.removeEventListener('resize', recalcSynced)
    }
  }, [])
}
