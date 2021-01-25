import { useMediaQuery, useTheme } from '@material-ui/core'
import { MotionProps } from 'framer-motion'

export type OverlayUiAnimationProps = {
  hold: boolean
  dismissed: boolean
  z: number
}

export default function useBottomOverlayUiAnimations(props: OverlayUiAnimationProps): MotionProps {
  const { hold, dismissed, z } = props

  return !hold
    ? {
        initial: {
          y: '100%',
          z,
          opacity: 0,
          originY: 0,
        },
        animate: {
          y: 0,
          z,
          opacity: 1,
          display: 'block',
          transition: { type: 'tween', ease: 'easeOut' },
          ...(dismissed && {
            y: '100%',
            opacity: 0,
            transition: { type: 'tween', ease: 'easeIn' },
            transitionEnd: { display: 'none' },
          }),
        },
      }
    : {
        initial: {
          opacity: 1,
          z,
          y: 0,
        },
        animate: {
          opacity: 1,
          z,
          y: 0,
          transition: { type: 'tween', ease: 'easeOut' },
        },
        exit: {
          opacity: 1,
          y: 0,
          z,
          transition: { type: 'tween', ease: 'easeIn' },
        },
      }
}
