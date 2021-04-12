import {
  motion,
  MotionStyle,
  MotionValue,
  useSpring,
  useTransform,
  useVelocity,
} from 'framer-motion'
import { useSheetContext } from './SheetContext'
import { SPRING_ANIM } from './animation'

const indicator: MotionStyle = {
  width: '18px',
  height: '4px',
  borderRadius: '99px',
  backgroundColor: '#ddd',
}

export default function SheetDragIndicator() {
  const { y, height } = useSheetContext()

  const vh = useTransform(useVelocity(height), (v) => v * -1)
  const vy = useVelocity(y)

  const degLeft = useTransform([vh, vy] as MotionValue[], ([dy, dh]: number[]) => {
    let deg = 0
    if (dy > 10 || dh > 10) deg = 10
    if (dy < -10 || dh < -10) deg = -10
    return deg
  })
  const degRight = useTransform(degLeft, (v) => v * -1)

  const rotateLeft = useSpring(degLeft, SPRING_ANIM)
  const rotateRight = useSpring(degRight, SPRING_ANIM)

  return (
    <div style={{ display: 'flex', height: 40, alignItems: 'center', justifyContent: 'center' }}>
      <motion.div style={{ ...indicator, translateX: 2, rotate: rotateLeft }} />
      <motion.div style={{ ...indicator, translateX: -2, rotate: rotateRight }} />
    </div>
  )
}
