import { MotionProps } from 'framer-motion'
import { OverlayUiAnimationProps } from './bottomOverlayUiAnimations'
import defaultDrawerAnimationObject from './defaultDrawerAnimationObject'
import nullAnimationObject from './nullAnimationObject'

export default function rightOverlayUiAnimations(props: OverlayUiAnimationProps): MotionProps {
  const { hold, dismissed, z, upMd } = props

  if (upMd) {
    return !hold
      ? {
          initial: {
            right: '-80px',
            y: 0,
            z,
            opacity: 0,
          },
          animate: {
            right: 0,
            y: 0,
            z,
            opacity: 1,
            display: 'block',
            transition: { type: 'tween', ease: 'easeOut' },
            ...(dismissed && {
              x: '180%',
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
            right: 0,
            y: 0,
          },
          animate: {
            opacity: 1,
            z,
            right: 0,
            y: 0,
            transition: { type: 'tween', ease: 'easeOut' },
          },
          exit: {
            opacity: 1,
            z,
            right: '-80px',
            y: 0,
            transition: { type: 'tween', ease: 'easeIn' },
          },
        }
  }

  return !hold ? defaultDrawerAnimationObject(z, dismissed) : nullAnimationObject(z)
}
