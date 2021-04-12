import { motion, MotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'
import { CSSProperties } from 'react'
import { SPRING_ANIM } from '../animation'
import useSheetContext from '../hooks/useSheetContext'

type Styles = 'indicatorRoot' | 'indicator'
type Axis = 'Y' | 'X'

export type SheetDragIndicatorClassKeys = Styles | `${Styles}${Axis}`

type SheetDragIndicatorProps = {
  styles?: Record<SheetDragIndicatorClassKeys, CSSProperties>
  classes?: Record<SheetDragIndicatorClassKeys, string>
}

export default function SheetDragIndicator(props: SheetDragIndicatorProps) {
  const { styles, classes } = props
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

  return (
    <div
      style={{ ...styles?.indicatorRoot, ...styles?.[`indicatorRoot${axis}`] }}
      className={`${classes?.indicatorRoot} ${classes?.[`indicatorRoot${axis}`]}`}
    >
      <motion.div
        style={{
          ...styles?.indicator,
          ...styles?.[`indicator${axis}`],
          translateX: 2,
          rotate: rotateLeft,
        }}
        className={`${classes?.indicator} ${classes?.[`indicator${axis}`]}`}
      />
      <motion.div
        style={{
          ...styles?.indicator,
          ...styles?.[`indicator${axis}`],
          translateX: -2,
          rotate: rotateRight,
        }}
        className={`${classes?.indicator} ${classes?.[`indicator${axis}`]}`}
      />
    </div>
  )
}
