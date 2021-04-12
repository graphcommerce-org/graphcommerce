import { DraggableProps, motion, MotionProps, PanInfo, useTransform } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import DragIndicator from './DragIndicator'
import { useSheetContext } from './SheetContext'
import { INERTIA_ANIM, SPRING_ANIM } from './animation'
import { nearestSnapPointIndex } from './snapPoint'
import useSnapPointVariants from './useSnapPointVariants'
import { velocityClamp } from './utils'
import useElementScroll from './utils/useElementScroll'
import useMotionValueValue from './utils/useMotionValueValue'
import windowSize from './windowSize'

type SheetPanelProps = {
  children: React.ReactNode
  open: boolean
  onSnap?: (index: number) => void
}
export default function SheetPanel(props: SheetPanelProps) {
  const { children, open, onSnap } = props
  const { y, height, maxHeight, snapPoints, controls } = useSheetContext()
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

  // Define the drag handling
  const onDragEnd = async (_: never, info: PanInfo) => {
    const index = nearestSnapPointIndex(velocityClamp(info).y + y.get(), snapPoints, height)
    onSnap?.(index)
    await controls.start(`snapPoint${index}`)
  }
  const dragProps: DraggableProps = { drag: 'y', dragTransition: INERTIA_ANIM, onDragEnd }
  const sharedProps: MotionProps = { transition: SPRING_ANIM }
  const contentRef = useRef<HTMLDivElement>(null)
  const canDrag = useMotionValueValue(useElementScroll(contentRef).yMax, (v) => v === 0)

  return (
    <>
      <motion.div
        {...dragProps}
        {...sharedProps}
        variants={{
          closed: () => ({ y: windowSize.height.get() }),
          ...useSnapPointVariants(),
        }}
        initial='closed'
        exit={`snapPoint${last}`}
        animate={controls}
        style={{
          backgroundColor: '#fff',
          borderTopRightRadius: '8px',
          borderTopLeftRadius: '8px',
          boxShadow: '0px -2px 16px rgba(0, 0, 0, 0.3)',
          flexDirection: 'row',
          willChange: `transform`,
          height: 41,
          marginBottom: -1, // todo: depending on which drawer
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
        {...sharedProps}
        {...(canDrag && dragProps)}
        ref={contentRef}
        style={{
          backgroundColor: '#fff',
          willChange: `transform`,
          overflowY: 'auto',
          maxHeight: useTransform(maxHeight, (h) => (h > 0 ? Math.max(0, h - 40) : 10000)),
          y,
        }}
      >
        {children}
      </motion.div>
    </>
  )
}
