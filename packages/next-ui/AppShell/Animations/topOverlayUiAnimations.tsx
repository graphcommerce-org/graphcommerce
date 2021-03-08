import { MotionProps } from 'framer-motion'
import { OverlayUiAnimationProps } from './bottomOverlayUiAnimations'
import nullAnimationObject from './nullAnimationObject'

export default function topOverlayUiAnimations(props: OverlayUiAnimationProps): MotionProps {
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
    : nullAnimationObject(z)
}
