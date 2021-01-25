import { useMediaQuery, useTheme } from '@material-ui/core'
import { MotionProps } from 'framer-motion'

export type OverlayUiAnimationProps = {
  hold: boolean
  dismissed: boolean
  z: number
}

export default function useBottomOverlayUiAnimations(props: OverlayUiAnimationProps): MotionProps {
  const { hold, dismissed, z } = props
  const theme = useTheme()
  const upMd = useMediaQuery(theme.breakpoints.up('md'), { noSsr: true })

  if (upMd) {
    return !hold
      ? {
          initial: { x: '-20%', y: 0, z, opacity: 0, originY: 0 },
          animate: {
            x: '0',
            y: 0,
            z,
            opacity: 1,
            display: 'block',
            transition: { type: 'tween', ease: 'easeOut' },
            ...(dismissed && {
              x: '-20%',
              opacity: 0,
              transition: { type: 'tween', ease: 'easeIn' },
              transitionEnd: { display: 'none' },
            }),
          },
        }
      : {
          initial: { opacity: 1, z, x: 0, y: 0 },
          animate: { opacity: 1, z, x: 0, y: 0, transition: { type: 'tween', ease: 'easeOut' } },
          exit: { opacity: 1, z, x: 0, y: 0, transition: { type: 'tween', ease: 'easeIn' } },
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
