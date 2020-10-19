import { makeStyles, Theme } from '@material-ui/core'
import { UseStyles } from 'components/Styles'
import { m as motion } from 'framer-motion'
import { HTMLMotionProps } from 'framer-motion/types/render/dom/types'
import { forwardRef, useState } from 'react'

// eslint-disable-next-line react/no-unused-prop-types
type BackdropPropsBase = { inFront: boolean }

const useStyles = makeStyles(
  (theme: Theme) => ({
    backdrop: {
      position: 'fixed',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: theme.palette.background.default,
      WebkitTapHighlightColor: 'none',
    },
  }),
  { name: 'Backdrop' },
)

export type BackdropProps = BackdropPropsBase &
  UseStyles<typeof useStyles> &
  Omit<
    HTMLMotionProps<'div'>,
    'className' | 'initial' | 'transition' | 'animate' | 'exit' | 'onAnimationComplete'
  >

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>((props, ref) => {
  const classes = useStyles(props)
  const { inFront, ...divProps } = props
  const [zIndex, setZIndex] = useState(inFront ? 0 : -1)
  return (
    <motion.div
      ref={ref}
      className={classes.backdrop}
      initial={{ opacity: 0, zIndex }}
      transition={{ type: 'tween', ease: 'circOut' }}
      animate={{ opacity: 1, zIndex }}
      exit={{ opacity: 0, transition: { ease: 'circIn' } }}
      onAnimationComplete={() => setZIndex(inFront ? 0 : -1)}
      {...divProps}
    />
  )
})
export default Backdrop
