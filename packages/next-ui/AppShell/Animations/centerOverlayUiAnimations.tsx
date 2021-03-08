import { MotionProps } from 'framer-motion'
import { OverlayUiAnimationProps } from './bottomOverlayUiAnimations'
import defaultDrawerAnimationObject from './defaultDrawerAnimationObject'
import nullAnimationObject from './nullAnimationObject'

export default function centerOverlayUiAnimations(props: OverlayUiAnimationProps): MotionProps {
  const { hold, dismissed, z, upMd } = props

  if (upMd) {
    return !hold
      ? {
          initial: {
            z,
            opacity: 0,
            origin: '50% 50%',
            scale: 0,
          },
          animate: {
            z,
            origin: '50% 50%',
            scale: 1,
            opacity: 1,
            display: 'block',
            transition: {
              type: 'tween',
              ease: 'backInOut',
            },
            ...(dismissed && {
              opacity: 0,
              scale: 0,
              transitionEnd: { display: 'none' },
            }),
          },
        }
      : {
          initial: {
            opacity: 1,
            z,
            scale: 1,
            origin: '50% 50%',
          },
          animate: {
            opacity: 1,
            z,
            scale: 1,
            origin: '50% 50%',
            y: '-20%',
            transition: { type: 'tween', ease: 'easeOut' },
          },
          exit: {
            opacity: 1,
            origin: '50% 50%',
            z,
            scale: 1,
            transition: { type: 'tween', ease: 'easeIn' },
          },
        }
  }

  return !hold ? defaultDrawerAnimationObject(z, dismissed) : nullAnimationObject(z)
}
