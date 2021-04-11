import { motion, PanInfo, useTransform } from 'framer-motion'
import React, { useEffect } from 'react'
import DragIndicator from './DragIndicator'
import { useSheetContext } from './SheetContext'
import { INERTIA_ANIM, SPRING_ANIM } from './animation'
import { nearestIndex } from './useSnapPoint'
import useSnapPointVariants from './useSnapPointVariants'
import { velocityClamp } from './utils'

export default function SheetPanel(props: { children?: React.ReactNode; open: boolean }) {
  const { children, open } = props
  const { y, height, snapPoints, controls } = useSheetContext()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    controls.start(open ? `snapPoint0` : 'closed')
  }, [open, controls])

  const onDragEnd = async (_: never, info: PanInfo) => {
    const idx = nearestIndex(velocityClamp(info).y + y.get(), snapPoints, height)
    await controls.start(`snapPoint${idx}`)
  }

  const minHeight = useTransform(height, (h) => Math.max(0, h - 40))
  return (
    <>
      <motion.div
        variants={{
          closed: () => ({ y: height.get() + 100 }),
          ...useSnapPointVariants(),
        }}
        initial='closed'
        exit='closed'
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
