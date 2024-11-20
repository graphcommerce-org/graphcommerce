import type { ScrollSnapType } from '../types'

export type SnapTypeDirection = 'block' | 'inline' | 'both'
export function scrollSnapTypeDirection(scrollSnapType: ScrollSnapType): SnapTypeDirection {
  let snapDir = scrollSnapType.split(' ')[0]
  snapDir = snapDir.replace('y', 'block')
  snapDir = snapDir.replace('x', 'inline')
  return snapDir as SnapTypeDirection
}
