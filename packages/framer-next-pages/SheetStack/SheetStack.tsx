import { motion, MotionValue, useSpring, useTransform } from 'framer-motion'
import React from 'react'
import { SPRING_ANIM } from '../Sheet/animation'
import { useSheetContext } from '../Sheet/components/Sheet'
import { useIsomorphicLayoutEffect } from '../Sheet/utils'

type SheetStackProps = { children: React.ReactNode; depth: number }

export default function SheetStack(props: SheetStackProps) {
  const { children, depth } = props
  const { drag: y, size: height } = useSheetContext()

  const OFFSET = 24

  const depthMotion = useSpring(depth, SPRING_ANIM)
  useIsomorphicLayoutEffect(() => {
    depthMotion.set(depth)
  }, [depth, depthMotion])

  const offset = useTransform(
    [y, height, depthMotion] as MotionValue[],
    ([yv, hv, dv]: number[]) => {
      const res = yv === 0 ? dv * OFFSET : (yv / hv) * dv * dv * OFFSET
      console.log(res)
    },
  )

  // const h = windowSize.height.get()
  // const scale = (h - y) / h

  return (
    <motion.div
      // animate={{ y: yOffset }}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, y: '0px' }}
      transition={SPRING_ANIM}
    >
      {children}
    </motion.div>
  )
}
