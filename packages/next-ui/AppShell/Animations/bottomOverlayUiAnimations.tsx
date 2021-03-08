import { MotionProps } from 'framer-motion'
import nullAnimationObject from './nullAnimationObject'

export type OverlayUiAnimationProps = {
  hold: boolean
  dismissed: boolean
  z: number
  upMd: boolean
}

export default function bottomOverlayUiAnimations(props: OverlayUiAnimationProps): MotionProps {
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
    : nullAnimationObject(z)
}
