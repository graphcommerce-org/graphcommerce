import { makeStyles, Theme } from '@material-ui/core'
import { m } from 'framer-motion'
import { HTMLMotionProps } from 'framer-motion/types/render/dom/types'
import { forwardRef, useState } from 'react'
import { UseStyles } from '../Styles'

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

export type BackdropProps = { zOffset?: number; hold?: boolean } & BackdropPropsBase &
  UseStyles<typeof useStyles> &
  Omit<HTMLMotionProps<'div'>, 'className' | 'onAnimationComplete'>

const Backdrop = forwardRef<HTMLDivElement, BackdropProps>((props, ref) => {
  const classes = useStyles(props)
  const { inFront, zOffset = 0, hold, ...divProps } = props
  const zIdx = inFront ? zOffset : zOffset - 1
  const [zIndex, setZIndex] = useState(zIdx)

  return (
    <m.div
      ref={ref}
      className={classes.backdrop}
      initial={{ opacity: 0, zIndex }}
      animate={{ opacity: 1, zIndex, transition: { type: 'tween' } }}
      exit={{ opacity: hold ? 1 : 0, pointerEvents: 'none', transition: { type: 'tween' } }}
      onAnimationComplete={() => setZIndex(zIdx)}
      {...divProps}
    />
  )
})
export default Backdrop
