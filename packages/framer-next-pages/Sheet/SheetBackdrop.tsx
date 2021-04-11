import { motion, MotionProps, MotionStyle } from 'framer-motion'

const styles: MotionStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(51, 51, 51, 0.5)',
  touchAction: 'none', // Disable iOS body scrolling
  willChange: 'opacity',
}

type SheetBackdropProps = Omit<MotionProps, 'initial' | 'animate' | 'exit'>

export default function SheetBackdrop(props: SheetBackdropProps) {
  const { style } = props

  return (
    <motion.div
      {...props}
      style={{ ...styles, ...style }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    />
  )
}
