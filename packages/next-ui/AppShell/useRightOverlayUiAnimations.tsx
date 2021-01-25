import { useMediaQuery, useTheme } from '@material-ui/core'
import { MotionProps } from 'framer-motion'
import { OverlayUiAnimationProps } from './useBottomOverlayUiAnimations'

export default function useRightOverlayUiAnimations(props: OverlayUiAnimationProps): MotionProps {
  const { hold, dismissed, z } = props
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

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

  return !hold
    ? {
        initial: {
          y: '90%',
          z,
          x: 0,
          opacity: 0,
          originY: 0,
        },
        animate: {
          y: '0',
          z,
          x: 0,
          opacity: 1,
          display: 'block',
          transition: { type: 'tween', ease: 'easeOut' },
          ...(dismissed && {
            y: '90%',
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
