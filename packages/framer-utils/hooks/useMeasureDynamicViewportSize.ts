import type { MotionValue } from 'framer-motion'
import { motionValue } from 'framer-motion'
import sync from 'framesync'
import { useEffect } from 'react'
import { clientSize } from '../utils/clientSize'
import { useConstant } from './useConstant'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export type UseClientSizeReturn = { x: MotionValue<string>; y: MotionValue<string> }
export type UseClientSizeOptions = { x?: string; y?: string }

/** @deprecated Please use dvh() or dvw() instead */
export const clientSizeCssVar = {
  y: 'var(--client-size-y)',
  x: 'var(--client-size-x)',
}

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

/**
 * Get the clientSize x|y as a motionValue
 *
 * ```tsx
 * function MyComponent() {
 *   const { y } = useClientSize({ y: '100vh' })
 *   return <motion.div style={{ height: y }}>bla</motion.div>
 * }
 * ```
 *
 * @deprecated Use `var(--client-size-y)` or `var(--client-size-x)` instead
 */
export function useClientSize(options?: UseClientSizeOptions): UseClientSizeReturn {
  const ret = useConstant<UseClientSizeReturn>(() => ({
    x: motionValue(options?.x ?? '0px'),
    y: motionValue(options?.y ?? '0px'),
  }))

  useEffect(() => {
    setTimeout(() => ret.x.set(`${clientSize.x.get()}px`), 1000)
    const cX = clientSize.x.on('change', (xv) => ret.x.set(`${xv}px`))
    return () => cX()
  }, [ret.x])

  useEffect(() => {
    setTimeout(() => ret.y.set(`${clientSize.y.get()}px`), 1000)
    const cY = clientSize.y.on('change', (yv) => ret.y.set(`${yv}px`))
    return () => cY()
  }, [ret.y])

  return ret
}
