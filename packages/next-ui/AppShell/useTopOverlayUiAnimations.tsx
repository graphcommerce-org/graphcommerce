import { MotionProps } from 'framer-motion'
import { OverlayUiAnimationProps } from './useBottomOverlayUiAnimations'

export default function useTopOverlayUiAnimations(props: OverlayUiAnimationProps): MotionProps {
  const { hold, dismissed, z } = props

  return !hold
    ? {
        initial: {
          y: '-50%',
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
            y: '-50%',
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
          x: 0,
          y: 0,
        },
        animate: {
          opacity: 1,
          z,
          x: 0,
          y: 0,
          transition: { type: 'tween', ease: 'easeOut' },
        },
        exit: {
          opacity: 1,
          z,
          x: 0,
          y: 0,
          transition: { type: 'tween', ease: 'easeIn' },
        },
      }
}
