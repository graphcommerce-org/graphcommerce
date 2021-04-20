import { motionValue, MotionValue } from 'framer-motion'
import { useEffect } from 'react'
import { clientSize } from '../utils/clientSize'
import { useConstant } from './useConstant'
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect'

export type UseClientSizeReturn = { x: MotionValue<string>; y: MotionValue<string> }
export type UseClientSizeOptions = { x?: string; y?: string }

/**
 * Get the clientSize x|y as a motionValue
 *
 * ```tsx
 * function MyComponent() {
 *   const { y } = useClientSize({ y: '100vh' })
 *   return <motion.div style={{ height: y }}>bla</motion.div>
 * }
 * ```
 */
export function useClientSize(options?: UseClientSizeOptions): UseClientSizeReturn {
  const ret = useConstant<UseClientSizeReturn>(() => ({
    x: motionValue(options?.x ?? `0px`),
    y: motionValue(options?.y ?? `0px`),
  }))

  useEffect(() => {
    setTimeout(() => ret.x.set(`${clientSize.x.get()}px`), 1000)
    const cX = clientSize.x.onChange((xv) => ret.x.set(`${xv}px`))
    return () => cX()
  }, [ret.x])

  useEffect(() => {
    setTimeout(() => ret.y.set(`${clientSize.y.get()}px`), 1000)
    const cY = clientSize.y.onChange((yv) => ret.y.set(`${yv}px`))
    return () => cY()
  }, [ret.y])

  return ret
}
