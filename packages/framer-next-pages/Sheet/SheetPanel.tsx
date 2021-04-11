import { motion, PanInfo, useTransform } from 'framer-motion'
import React, { useEffect } from 'react'
import DragIndicator from './DragIndicator'
import { useSheetContext } from './SheetContext'
import { INERTIA_ANIM, SPRING_ANIM } from './animation'
import { nearestSnapPointIndex } from './snapPoint'
import useSnapPointVariants from './useSnapPointVariants'
import { velocityClamp } from './utils'
import windowSize from './windowSize'

type SheetPanelProps = {
  children: React.ReactNode
  open: boolean
  onSnap?: (index: number) => void
}
export default function SheetPanel(props: SheetPanelProps) {
  const { children, open, onSnap } = props
  const { y, height, snapPoints, controls } = useSheetContext()
  const last = snapPoints.length - 1

  // Open/close the panel when the height is calculated
  useEffect(() => {
    let cancel: () => void
    const init = () => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      controls.start(open ? `snapPoint0` : `snapPoint${last}`)
      cancel()
    }
    cancel = height.onChange(init)
    return cancel
  }, [open, controls, last, height])

  const onDragEnd = async (_: never, info: PanInfo) => {
    const index = nearestSnapPointIndex(velocityClamp(info).y + y.get(), snapPoints, height)
    onSnap?.(index)
    await controls.start(`snapPoint${index}`)
  }

  const minHeight = useTransform(height, (h) => Math.max(0, h - 40))
  return (
    <>
      <motion.div
        variants={{
          closed: () => ({ y: windowSize.height.get() }),
          ...useSnapPointVariants(),
        }}
        initial='closed'
        exit={`snapPoint${last}`}
        transition={SPRING_ANIM}
        animate={controls}
        drag='y'
        dragTransition={INERTIA_ANIM}
        onDragEnd={onDragEnd}
        style={{
          backgroundColor: '#fff',
          borderTopRightRadius: '8px',
          borderTopLeftRadius: '8px',
          boxShadow: '0px -2px 16px rgba(0, 0, 0, 0.3)',
          flexDirection: 'row',
          willChange: `transform`,
          height: 40,
          width: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          y,
        }}
      >
        <DragIndicator />
      </motion.div>
      <motion.div
        style={{
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          willChange: `transform`,
          overflowY: 'auto',
          minHeight,
          y,
        }}
      >
        {children}
      </motion.div>
    </>
  )
}
