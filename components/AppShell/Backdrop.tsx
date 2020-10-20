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

export type BackdropProps = { instant?: boolean; zOffset?: number } & BackdropPropsBase &
  UseStyles<typeof useStyles> &
  Omit<HTMLMotionProps<'div'>, 'className' | 'onAnimationComplete'>

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>((props, ref) => {
  const classes = useStyles(props)
  const { inFront, instant, zOffset = 0, ...divProps } = props
  const zIndex = inFront ? zOffset : zOffset - 1
  const [zIndexDeferred, setZIndex] = useState(zIndex)

  if (instant) {
    return (
      <motion.div
        ref={ref}
        className={classes.backdrop}
        initial={{ opacity: 0, zIndex }}
        animate={{ opacity: 1, zIndex, transition: { type: 'tween', duration: 0 } }}
        exit={{ opacity: 0, transition: { type: 'tween', duration: 0 } }}
        {...divProps}
      />
    )
  }

  return (
    <motion.div
      ref={ref}
      className={classes.backdrop}
      initial={{ opacity: 0, zIndex: zIndexDeferred }}
      animate={{
        opacity: 1,
        zIndex: zIndexDeferred,
        transition: { type: 'tween', ease: 'circOut' },
      }}
      exit={{ opacity: 0, transition: { type: 'tween', ease: 'circIn' } }}
      onAnimationComplete={() => setZIndex(zIndex)}
      {...divProps}
    />
  )
})
export default Backdrop
