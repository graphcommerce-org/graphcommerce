import { motion, PanInfo, Point2D, useTransform } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import DragIndicator from './DragIndicator'
import SheetContainer from './SheetContainer'
import { useSheetContext } from './SheetContext'
import { INERTIA_ANIM, SPRING_ANIM } from './animation'
import { nearestIndex } from './useSnapPoint'
import useSnapPointBottom from './useSnapPointBottom'
import useSnapPointVariants from './useSnapPointVariants'
import windowSize from './windowSize'

function velocityClampAxis(velocity: number, offset: number, clamp: number) {
  return velocity < 0 ? Math.max(velocity, offset * clamp) : Math.min(velocity, offset * clamp)
}
function velocityClamp({ velocity, offset }: PanInfo, clamp = 2): Point2D {
  return {
    x: velocityClampAxis(velocity.x, offset.x, clamp),
    y: velocityClampAxis(velocity.y, offset.y, clamp),
  }
}

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

  const maxHeight = useTransform(useSnapPointBottom(), (v) => v - 40)
  const variants = useSnapPointVariants()

  return (
    <SheetContainer>
      <motion.div
        variants={{
          closed: () => ({ y: windowSize.height.get() + 100 }),
          ...variants,
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
          y,
        }}
      >
        {children}
      </motion.div>
    </SheetContainer>
  )
}
