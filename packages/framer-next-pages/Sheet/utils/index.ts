import { PanInfo, Point2D } from 'framer-motion'
import { useLayoutEffect, useEffect } from 'react'

function velocityClampAxis(velocity: number, offset: number, clamp: number) {
  return velocity < 0 ? Math.max(velocity, offset * clamp) : Math.min(velocity, offset * clamp)
}
export function velocityClamp({ velocity, offset }: PanInfo, clamp = 2): Point2D {
  return {
    x: velocityClampAxis(velocity.x, offset.x, clamp),
    y: velocityClampAxis(velocity.y, offset.y, clamp),
  }
}

export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
