import { Image, ImageProps } from '@graphcommerce/image'
import { makeStyles } from '@graphcommerce/next-ui/Styles/tssReact'
import clsx from 'clsx'
import { m } from 'framer-motion'
import React, { forwardRef } from 'react'

const useStyles = makeStyles({ name: 'MotionImageAspect' })({
  root: {
    position: 'relative',
  },
  picture: {
    display: 'block',
    '@supports (aspect-ratio: 1 / 1)': {
      maxWidth: '99.6%',
      maxHeight: '100%',
      width: 'auto',
      height: 'auto',

      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',

      '&:after': {
        display: 'block',
        content: '""',
        minWidth: '100vw',
      },
    },
    '@supports not (aspect-ratio: 1 / 1)': {
      width: '100% !important',
      height: '100% !important',
    },
  },
  image: {
    display: 'block',
    '@supports not (aspect-ratio: 1 / 1)': {
      objectFit: 'contain',
    },
  },
})

export type MotionImageAspectProps = Omit<ImageProps, 'layout' | 'unoptimized'>

/**
 * - Renders an image with the given aspect ratio
 * - Supports framer motion layout transitions
 *
 * Note: We have a fallback for Safari 14 which doesn't yet support aspect-ratio, this causes a
 * problem when the layout is animated. Should be fixed in Safari 15
 */
const MotionImageAspect = m(
  forwardRef<HTMLImageElement, MotionImageAspectProps>((props, ref) => {
    const { classes } = useStyles()
    return (
      <div className={classes.root}>
        <Image
          {...props}
          layout='fill'
          ref={ref}
          className={clsx(classes.image, props.className)}
          pictureProps={{
            className: clsx(classes.picture, props.pictureProps?.className),
            style: { ...props.style, aspectRatio: `${props.width} / ${props.height}` },
          }}
        />
      </div>
    )
  }),
)

MotionImageAspect.displayName = 'MotionImageAspect'

export default MotionImageAspect
