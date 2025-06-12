import { px } from 'framer-motion'
import { numberToPx } from '../utils/numberToPx'
import type { UseMotionRectOptions } from './useMotionRect'
import { useMotionRect } from './useMotionRect'
import { useMotionValueValue } from './useMotionValueValue'

type UseMakeFullScreenReturn = {
  marginTop: string
  marginBottom: string
  marginLeft: string
  marginRight: string
  margin: `${string} ${string} ${string} ${string}`
}

/** Calculate negative margin values to make an element fullscreen. */
export function useMakeFullscreen<E extends HTMLElement>(
  ref: React.RefObject<E>,
  options?: UseMotionRectOptions,
): UseMakeFullScreenReturn {
  const rect = useMotionRect(ref, options)

  return useMotionValueValue(rect, (r) => {
    const { top, left, marginBottom, marginRight } = r
    const mt = numberToPx(top * -1)
    const mb = numberToPx(marginBottom * -1)
    const ml = numberToPx(left * -1)
    const mr = numberToPx(marginRight * -1)

    return {
      marginTop: mt,
      marginBottom: mb,
      marginLeft: ml,
      marginRight: mr,
      margin: `${mt} ${mr} ${mb} ${ml}`,
    }
  })
}
