import { Styled } from '@graphcommerce/framer-utils'
import clsx from 'clsx'
import { m, MotionValue, useSpring, useTransform, useVelocity } from 'framer-motion'
import { SPRING_ANIM } from '../animation'
import { useSheetContext } from '../hooks/useSheetContext'
import { SheetVariant } from '../types'

type Styles = 'indicatorRoot' | 'indicator'
export type SheetDragIndicatorClassKeys = Styles | `${Styles}${SheetVariant}`

export type SheetDragIndicatorProps = Styled<SheetDragIndicatorClassKeys>

export default function SheetDragIndicator(props: SheetDragIndicatorProps) {
  const { styles, classes } = props
  const { drag, size, variant } = useSheetContext()

  const axis = ['top', 'bottom'].includes(variant) ? 'Y' : 'X'

  const vsize = useTransform(useVelocity(size), (v) => v * -1)
  const vdrag = useVelocity(drag)

  const degLeft = useTransform([vsize, vdrag] as MotionValue[], ([vsizeDx, vdragDx]: number[]) => {
    let deg = 0
    if (vsizeDx > 8 || vdragDx > 8) deg = 8
    if (vsizeDx < -8 || vdragDx < -8) deg = -8
    return deg
  })
  const degRight = useTransform(degLeft, (v) => v * -1)

  const rotateLeft = useSpring(degLeft, SPRING_ANIM)
  const rotateRight = useSpring(degRight, SPRING_ANIM)

  return (
    <div
      className={clsx(classes?.indicatorRoot, classes?.[`indicatorRoot${variant}`])}
      style={{ ...styles?.indicatorRoot, ...styles?.[`indicatorRoot${variant}`] }}
    >
      <m.div
        className={clsx(classes?.indicator, classes?.[`indicator${variant}`])}
        style={{
          ...styles?.indicator,
          ...styles?.[`indicator${variant}`],
          ...(axis === 'Y' ? { translateX: 2 } : { translateY: -2 }),
          rotate: rotateLeft,
        }}
      />
      <m.div
        className={clsx(classes?.indicator, classes?.[`indicator${variant}`])}
        style={{
          ...styles?.indicator,
          ...styles?.[`indicator${variant}`],
          ...(axis === 'Y' ? { translateX: -2 } : { translateY: 2 }),
          rotate: rotateRight,
        }}
      />
    </div>
  )
}
