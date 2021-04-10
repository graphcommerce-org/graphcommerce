import { motion, MotionStyle, useSpring, useTransform, useVelocity } from 'framer-motion'
import { useSheetContext } from './SheetContext'
import { SPRING_ANIM } from './animation'

const indicator: MotionStyle = {
  width: '18px',
  height: '4px',
  borderRadius: '99px',
  backgroundColor: '#ddd',
}

export default function DragIndicator() {
  const { y } = useSheetContext()

  const rotateLeft = useSpring(
    useTransform(useVelocity(y), (v) => {
      let deg = 0
      if (v > 10) deg = 10
      if (v < -10) deg = -10
      return deg
    }),
    SPRING_ANIM,
  )
  const rotateRight = useTransform(rotateLeft, (v) => v * -1)

  return (
    <>
      <motion.span style={{ ...indicator, translateX: 2, rotate: rotateLeft }} />
      <motion.span style={{ ...indicator, translateX: -2, rotate: rotateRight }} />
    </>
  )
}
