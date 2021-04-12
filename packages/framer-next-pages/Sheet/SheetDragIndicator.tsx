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

type Styles = 'root' | 'indicator'
type Axis = 'Y' | 'X'

const styles: Record<Styles | `${Styles}${Axis}`, MotionStyle> = {
  root: { display: 'flex', alignItems: 'center', justifyContent: 'center' },
  rootY: { height: 40 },
  rootX: { width: 40 },
  indicator: { borderRadius: 99, backgroundColor: '#ddd' },
  indicatorY: { width: 18, height: 4 },
  indicatorX: { width: 4, height: 18 },
}

export default function SheetDragIndicator() {
  const { drag, size, variant } = useSheetContext()

  const axis: Axis = ['top', 'bottom'].includes(variant) ? 'Y' : 'X'
  const vsize = useTransform(useVelocity(size), (v) => v * -1)
  const vdrag = useVelocity(drag)

  const degLeft = useTransform([vsize, vdrag] as MotionValue[], ([vsizeDx, vdragDx]: number[]) => {
    let deg = 0
    if (vsizeDx > 10 || vdragDx > 10) deg = 10
    if (vsizeDx < -10 || vdragDx < -10) deg = -10
    return deg
  })
  const degRight = useTransform(degLeft, (v) => v * -1)

  const rotateLeft = useSpring(degLeft, SPRING_ANIM)
  const rotateRight = useSpring(degRight, SPRING_ANIM)

  const indicator = { ...styles.indicator, ...styles[`indicator${axis}`] }
  return (
    <div style={{ ...styles.root, ...styles[`root${axis}`] }}>
      <motion.div style={{ ...indicator, translateX: 2, rotate: rotateLeft }} />
      <motion.div style={{ ...indicator, translateX: -2, rotate: rotateRight }} />
    </div>
  )
}
