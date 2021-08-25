import { SnapPositionDirection } from '../types'
import { useScrollTo } from './useScrollTo'
import { useScrollerContext } from './useScrollerContext'

export type UseScrollerButton = SnapPositionDirection

/**
 * Usage:
 *
 * ```tsx
 * const MyComponent = () => {
 *    const scrollerButton = useScrollerButton('right');
 *    return <button {...scrollerButton}>right</button>
 * }
 * ```
 */
export function useScrollerButton(direction: UseScrollerButton) {
  const { getSnapPosition } = useScrollerContext()
  const scrollTo = useScrollTo()
  return { onClick: () => scrollTo(getSnapPosition(direction)) }
}
