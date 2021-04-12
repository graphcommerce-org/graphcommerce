import { motion, MotionProps, MotionStyle, MotionValue, useTransform } from 'framer-motion'
import { useSheetContext } from './SheetContext'

const styles: MotionStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(51, 51, 51, 0.5)',
  touchAction: 'none', // Disable iOS body scrolling
  willChange: 'opacity',
  border: 0,
  padding: 0,
}

type SheetBackdropProps = Omit<MotionProps, 'initial' | 'animate' | 'exit'>

export default function SheetBackdrop(props: SheetBackdropProps) {
  const { style, onTap } = props
  const { drag, size, variant } = useSheetContext()

  const sign = ['top', 'left'].includes(variant) ? -1 : 1

  // We animate the opacity of the Backdrop based on the position of the sheet
  const opacity = useTransform([drag, size] as MotionValue[], ([dragv, sizev]: number[]) => {
    if (sizev === 0) return 0
    if (dragv === 0) return 1
    return 1 - (dragv / sizev) * sign
  })

  const Component = onTap ? motion.button : motion.div
  return (
    <Component onTap={onTap} type='button' {...props} style={{ ...styles, ...style, opacity }} />
  )
}
